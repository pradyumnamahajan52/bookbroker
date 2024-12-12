# Generated by Django 3.1.7 on 2021-02-20 15:16

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product_category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category_name', models.CharField(default=None, max_length=50)),
                ('image', models.ImageField(blank=True, default=None, null=True, upload_to='product_category/')),
            ],
        ),
    ]