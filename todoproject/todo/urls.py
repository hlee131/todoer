from .api import TodoViewset

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('todos', TodoViewset, basename='todo')
urlpatterns = router.urls