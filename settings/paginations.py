from rest_framework.pagination import PageNumberPagination

class DefaultPagination(PageNumberPagination):
    page_size = 6

class UserPagination(PageNumberPagination):
    page_size = 7