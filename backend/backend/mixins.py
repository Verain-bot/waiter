import re

class URLEnumMixin():
    
    def getURL(self, **kwargs):        
        x = self.value

        pattern = r'<(\w+):(\w+)>'
        x = re.sub(pattern, r':\2', x)

        for key, value in kwargs.items():
            x = re.sub(f':{key}', str(value), x)

        if self.BASE == '':
            return x
        else:
            return '/'+self.BASE+x
    
    
    def getTestURL(self, **kwargs):
        x = self.getURL(**kwargs)
        return 'http://testserver'+x
    
    
    @classmethod
    def get_URLS(self):
        d = {}
        for app in self:
            if app.name == 'BASE':
                continue

            d[app.name] = app.getURL()
        
        return d
