from django import forms


class StudentForm(forms.Form):
    name_surname = forms.CharField(widget=forms.TextInput(attrs={'class': 'input_name_surname'}))
    sex = forms.ChoiceField(widget=forms.RadioSelect)
    date_birth = forms.DateField(widget=forms.DateInput(attrs={'class': 'input_date'}))
    phone = forms.CharField(widget=forms.TextInput(attrs={'class': 'input_name_surname'}))
    about_yourself = forms.CharField(widget=forms.Textarea(attrs={'class': 'input_about'}))

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # self.fields['name_surname'].label = "Имя и фамилия"
        # self.fields['date_birth'].label = 'Дата рождения'
        # self.fields['phone'].label = 'Номер телефона'
        # self.fields['about_yourself'].label = 'О себе'
