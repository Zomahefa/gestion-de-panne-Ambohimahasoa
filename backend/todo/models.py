from django.db import models
from django.contrib.auth.models import AbstractUser

class Technician(AbstractUser):
    full_name = models.CharField(max_length=100, default='Technicien')
    matricule = models.CharField(max_length=50, unique=True, default='TEMP-MAT')  # ✅ valeur temporaire
    contact = models.CharField(max_length=100, default='0000000000')              # ✅ valeur temporaire
    role = models.CharField(max_length=20, default='technician')

    def __str__(self):
        return f"{self.full_name} ({self.username})"


class Todo(models.Model):
    STATUS_CHOICES = [
        ('pending', 'En attente'),
        ('on_the_way', 'En route'),
        ('in_progress', 'En cours'),
        ('resolved', 'Terminé'),
    ]

    client_name = models.CharField(max_length=100)
    contact = models.CharField(max_length=20)
    quartier = models.CharField(max_length=100)
    lot = models.CharField(max_length=100, blank=True, null=True)  # ✅ champ optionnel
    localisation = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    image = models.ImageField(upload_to='incident_images/', blank=True, null=True)  # ✅ image optionnelle

    technician_note = models.TextField(blank=True, null=True)
    technician_confirmed = models.ForeignKey(Technician, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    resolved_at = models.DateTimeField(blank=True, null=True)
    

    def __str__(self):
        return f"{self.client_name} - {self.status}"
