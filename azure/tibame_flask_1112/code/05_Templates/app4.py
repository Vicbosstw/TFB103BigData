from flask import Flask, render_template
app = Flask(__name__)

@app.route('/result')
def result():
   name_list = ['isaac', 'andy', 'amy']
   return render_template('result2.html', result = name_list)
   # return 'test123'
if __name__ == '__main__':
   app.run(debug = True)