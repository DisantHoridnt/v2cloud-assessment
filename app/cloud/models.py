from django.db import models


class Server(models.Model):
	name = models.TextField(null=True)
	region = models.TextField(null=True)

	class Meta:
		managed = False

class Vm(models.Model):
	name = models.TextField(null=True)
	cpus = models.IntegerField(default=1, null=True)
	ram = models.IntegerField(default=4, null=True)
	server = models.ForeignKey(Server, null=True, on_delete=models.SET_NULL)
	active = models.BooleanField(default=True)