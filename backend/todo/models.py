from django.db import models

class Todo(models.Model):
    STATUS_CHOICES = [
        ('pending', 'En attente'),
        ('on_the_way', 'En route'),
        ('in_progress', 'En cours'),
        ('resolved', 'Terminé'),
    ]

    client_name = models.CharField(max_length=100)
    contact = models.CharField(max_length=20)  # Numéro de téléphone
    quartier = models.CharField(max_length=100)
    lot = models.CharField(max_length=100)
    localisation = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    technician_note = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    resolved_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"{self.client_name} - {self.status}"
