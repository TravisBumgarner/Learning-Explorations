from rest_framework import  viewsets

from .serializers import QuestionSerializer
from .models import Question

# Viewsets automatically generate URL confs. If more control is needed can switch to views. 
class QuestionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Question.objects.all().order_by('-pub_date')
    serializer_class = QuestionSerializer
