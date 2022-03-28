from django.db import models
from django.conf import settings


# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100)

    class Meta():
        verbose_name_plural = "Categories"
    def __str__(self):
        return self.name

class Blog(models.Model): 
    STATUS_CHOICES = (
        ('Draft', 'Draft'),
        ('Published', 'Published')
    )
    title = models.CharField(max_length=50)
    content = models.TextField()
    image = models.TextField(blank=True,null=True)
    category = models.ForeignKey(Category,on_delete=models.PROTECT)
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default="Draft")
    date = models.DateTimeField(auto_now_add=True)
    date_update = models.DateTimeField(auto_now=True)
    user =models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True,null=True, )
    
    def __str__(self):
        return self.title

    def comment_count(self):
        return self.comment_set.all().count()
    
    def like_count(self):
        return self.like_set.all().count()

    def postview_count(self):
        return self.postview_set.all().count()

    def comments(self):
        return self.comment_set.all()
    
    class Meta:
        ordering = ['-date_update',]

    

class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    post = models.ForeignKey(Blog,on_delete=models.CASCADE)
    time_stamp = models.DateTimeField(auto_now_add=True)
    content = models.TextField()

    def __str__(self):
        return self.content


    class Meta:
        ordering = ['-time_stamp',]
       
    
class Like(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    post = models.ForeignKey(Blog,on_delete=models.CASCADE)

class PostView(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    post = models.ForeignKey(Blog,on_delete=models.CASCADE)
    time_stamp = models.DateTimeField(auto_now_add=True)