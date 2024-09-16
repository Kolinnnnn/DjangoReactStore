from django.contrib import admin
from userauths.models import Profile,User

class UserAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'email', 'phone']
    search_fields = ['full_name']

class ProfileAdmin(admin.ModelAdmin):
    list_display = ['full_name','gender','country']
    list_filter = ['date']
    search_fields = ['full_name']

admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
