#!/bin/sh

# Wait for database to be ready
echo "Waiting for PostgreSQL..."
timeout=30
until nc -z $DB_HOST $DB_PORT || [ $timeout -le 0 ]; do
  echo "Waiting for PostgreSQL... $timeout seconds left"
  sleep 1
  timeout=$((timeout-1))
done

if [ $timeout -le 0 ]; then
    echo "Failed to connect to PostgreSQL"
    exit 1
fi

echo "PostgreSQL started"

# Run migrations
python manage.py migrate

# Create superuser if needed
python manage.py shell << END
from django.contrib.auth.models import User
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin')
END

exec "$@"