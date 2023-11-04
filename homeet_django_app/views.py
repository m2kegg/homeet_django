from django.shortcuts import render
from .forms import StudentForm


def reg_view(request):
    if request.method == 'POST':
        form = StudentForm(request.POST)
    else:
        form = StudentForm()
    return render(request, 'index.html', {'form': form})
