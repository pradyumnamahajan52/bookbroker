# Generated by Django 3.1.7 on 2021-02-27 05:33

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0002_auto_20210220_1516'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='long_desc',
        ),
        migrations.AddField(
            model_name='product',
            name='description',
            field=ckeditor.fields.RichTextField(default=None),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='product',
            name='point_desc',
            field=ckeditor.fields.RichTextField(default=None),
            preserve_default=False,
        ),
    ]
