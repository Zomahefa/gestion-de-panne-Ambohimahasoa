from rest_framework import serializers
from .models import Technician, Todo

class TechnicianSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    username = serializers.CharField(required=False)  # ✅ ← ici

    class Meta:
        model = Technician
        fields = ['id', 'username', 'full_name', 'matricule', 'contact', 'password']
        extra_kwargs = {
            'username': {'read_only': True},  # ← empêche modification
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        username = validated_data.get('username')
        if not username:
            raise serializers.ValidationError({"username": "Ce champ est requis."})
        technician = Technician(**validated_data)
        technician.set_password(password)
        technician.save()
        return technician

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)

        # Si le nom est modifié, on régénère le username
        if 'full_name' in validated_data:
            new_name = validated_data['full_name']
            instance.username = new_name.lower().replace(' ', '')

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()
        return instance


    



class TodoSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True, use_url=True)  # ✅ image optionnelle
   
    class Meta:
        model = Todo
        fields = '__all__'
