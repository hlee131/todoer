from .api import TodoViewset, CategoryViewset

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('todos', TodoViewset, basename='todo')
router.register('categories', CategoryViewset, basename='category')
urlpatterns = router.urls