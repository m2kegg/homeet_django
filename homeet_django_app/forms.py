from django import forms

class RadioSelectSex(forms.RadioSelect):
    def create_option(
        self, name, value, label, selected, index, subindex=None, attrs=None
    ):
        option = super().create_option(self, name, value, label, selected, index, subindex=subindex, attrs=attrs)
        option['attrs']['id'] = f'{value}'


CHOICES =[('sex1', "Парень"), ('sex2', "Девушка")]
class StudentForm(forms.Form):
    name_surname = forms.CharField(widget=forms.TextInput(attrs={'class': 'input_name_surname', 'id':'name_surname', 'placeholder':''}))
    sex = forms.ChoiceField(widget=RadioSelectSex,choices=CHOICES)
    date_birth = forms.DateField(widget=forms.DateInput(attrs={'class': 'input_date', 'type':'date', }))
    telegram = forms.CharField(widget=forms.TextInput(attrs={'class':'input_name_surname', 'id':'rg', 'placeholder':''}))
    phone = forms.CharField(widget=forms.TextInput(attrs={'class': 'input_name_surname', 'id':'number', 'placeholder':''}))
    about_yourself = forms.CharField(widget=forms.Textarea(attrs={'class': 'input_about', 'id':'about', 'placeholder':''}))

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # self.fields['name_surname'].label = "Имя и фамилия"
        # self.fields['date_birth'].label = 'Дата рождения'
        # self.fields['phone'].label = 'Номер телефона'
        # self.fields['about_yourself'].label = 'О себе'
