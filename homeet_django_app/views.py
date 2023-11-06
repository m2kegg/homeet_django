from django.shortcuts import render
from .forms import StudentForm, LearnForm

forms = 0

def reg_view(request):
    global forms
    if request.method == 'POST' and forms == 0:
        form = StudentForm(request.POST)
        form_text = 'form1'
        forms += 1
    elif request.method == 'POST' and forms == 1:
        form = LearnForm(request.POST)
        form_text = 'form2'
    elif forms == 1:
        form = LearnForm()
        form_text = 'form2'
    else:
        form = StudentForm()
        form_text = 'form1'
        forms += 1
    return render(request, 'index.html', {'form': form, 'form_text': form_text})
