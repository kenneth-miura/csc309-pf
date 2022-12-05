from django.contrib import admin
from .models import Studio, StudioImage, StudioAmenities


# Register your models here.

class StudioImageInline(admin.TabularInline):
    model = StudioImage
    fields = ['image']


class StudioAmenitiesInline(admin.TabularInline):
    model = StudioAmenities


class StudioAdmin(admin.ModelAdmin):
    inlines = [StudioImageInline, StudioAmenitiesInline]
    fields = ['name', 'address', 'postal_code', 'phone_num', 'longitude', 'latitude']


admin.site.register(Studio, StudioAdmin)
admin.site.register(StudioAmenities)
admin.site.register(StudioImage)
