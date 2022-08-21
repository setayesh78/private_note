import os
from datetime import timedelta
from pymongo.errors import OperationFailure
from rest_framework.views import APIView, Response
from rest_framework.status import *
from django.utils import timezone
from pymongo import MongoClient


def get_db_handle(db_name, host, port, username, password):
    client = MongoClient(host=host,
                         port=port,
                         username=username,
                         password=password)
    db_handle = client[db_name]
    return db_handle, client


def get_collection_handle(db_handle, collection_name):
    return db_handle[collection_name]


try:
    # DATABASE_NAME = os.getenv("DATABASE_NAME")
    # DATABASE_URL = os.getenv("DATABASE_URL")
    # # DATABASE_PORT = int(os.getenv("DATABASE_PORT"))
    # DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")
    # DATABASE_USERNAME = os.getenv("DATABASE_USERNAME")
    db_handler, mongo_client = get_db_handle('privetNote', 'mongo', 27017, 'admin','admin')
except OperationFailure:
    print("Authentication failed")


class Note(APIView):
    def get(self, request):
        return Response(data="new note:", status=HTTP_200_OK)


class AddNote(APIView):
    def post(self, request):
        content = request.data['content']

        notes_handler = get_collection_handle(db_handler, 'privet_note')
        size = len(list(notes_handler.find()))
        url = "http://127.0.0.1:8000/note/get/" + str(size)
        expired_date = timezone.now() + timedelta(days=1, hours=0, minutes=0)
        notes_handler.insert_one({"content": content, "url": url, "expired_date": expired_date})
        return Response(data={"url": url}, status=HTTP_201_CREATED)


class GetNote(APIView):
    def get(self, request, url):
        msg = "are you sure you want to see note with url http://127.0.0.1:8000/note/get/" + str(url) + " ?"
        return Response(data=msg, status=HTTP_200_OK)


class SeeNote(APIView):
    def get(self, request, url):
        notes_handler = get_collection_handle(db_handler, 'privet_note')
        url = "http://127.0.0.1:8000/note/get/" + str(url)
        note = list(notes_handler.find({"url": url, "expired_date": {"$gt": timezone.now()}}))
        if note:
            note = note[0]['content']
            notes_handler.delete_one({"url": url, "expired_date": {"$gt": timezone.now()}})
            return Response(data=note, status=HTTP_200_OK)
        return Response(data="no such a note exist or not expired.", status=HTTP_200_OK)
