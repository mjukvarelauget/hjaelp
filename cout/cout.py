NEWLINE = "\n"

class Cout():
    def __lshift__(self, string):
        print(string, end="")
        return self
        
    def __str__(self):
        return ""
