from django import forms


class RadioSelectSex(forms.RadioSelect):
    template_name = 'homeet_django_app/widgets/widget_radio.html'

    def create_option(
            self, name, value, label, selected, index, subindex=None, attrs=None
    ):
        option = super().create_option(self, name, value, label, selected, index)
        option['attrs']['id'] = f'{value}'
        if value=='sex1':
            option['label'] = "Парень"
        else:
            option['label'] = "Девушка"
        return option

class RadioSelectStud(forms.RadioSelect):
    template_name = 'homeet_django_app/widgets/widget_radio.html'

    def create_option(
            self, name, value, label, selected, index, subindex=None, attrs=None
    ):
        option = super().create_option(self, name, value, label, selected, index)
        option['attrs']['id'] = f'{value}'
        if value=='stud1':
            option['label'] = "Студент/выпускник"
        else:
            option['label'] = "Работающий"
        return option

class RadioSelectCourse(forms.RadioSelect):
    template_name = 'homeet_django_app/widgets/widget_select.html'

    def create_option(
        self, name, value, label, selected, index, subindex=None, attrs=None
    ):
        option = super().create_option(self, name, value, label, selected, index)
        option['attrs']['id'] = f'k{value}'
        return option


CHOICES = [('sex1', "Парень"), ('sex2', "Девушка")]
CHOICES2 = [('stud1', "Студент/выпускник"), ('stud2', "Работающий")]
CHOICES3 = [("1", "Курс 1"), ("2", "Курс 2"), ("3", "Курс 3"), ("4", "Курс 4"), ("5", "Курс 5"), ("6", "Курс 6")]

class StudentForm(forms.Form):
    name_surname = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'input_name_surname', 'id': 'name_surname', 'placeholder': ''}))
    sex = forms.ChoiceField(widget=RadioSelectSex(attrs={'class': 'div_radio_sex'}), choices=CHOICES)
    date_birth = forms.DateField(widget=forms.DateInput(attrs={'class': 'input_date', 'type': 'date', 'id':'input_tgm'}))
    telegram = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'input_name_surname', 'id': 'tg', 'placeholder': ''}))
    phone = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'input_name_surname', 'id': 'number', 'placeholder': ''}))
    about_yourself = forms.CharField(
        widget=forms.Textarea(attrs={'class': 'input_about', 'id': 'about', 'placeholder': ''}))

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # self.fields['name_surname'].label = "Имя и фамилия"
        # self.fields['date_birth'].label = 'Дата рождения'
        # self.fields['phone'].label = 'Номер телефона'
        # self.fields['about_yourself'].label = 'О себе'

class LearnForm(forms.Form):
    stud_sotr = forms.ChoiceField(widget=RadioSelectStud(attrs={'class':'div_student_vipusk'}), choices=CHOICES2)
    radio_field = forms.ChoiceField(widget=RadioSelectCourse, choices=CHOICES3)
    check_field = forms.ChoiceField(widget=forms.CheckboxInput(attrs={'class':'div_gal'}), choices=[("Я уже смешарик", 'checked')])
