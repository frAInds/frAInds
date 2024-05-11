from django.db import models


class Request(models.Model):
    word = models.CharField(max_length=3000)
    date = models.DateField()
    time = models.TimeField()

    def __str__(self):
        return self.word

class Response(models.Model):
    word = models.CharField(max_length=3000)
    reaction = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()

    def __str__(self):
        return self.word

