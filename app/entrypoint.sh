#!/bin/sh

# Run migrations
python manage.py migrate

# Start server
exec "$@"