from flask import Flask, render_template
app = Flask(__name__)

@app.route('/result')
def result():
   i = list(range(1,10))
   j = list(range(1,10))
   
   return render_template('result3.html', i=i, j=j)

if __name__ == '__main__':
   app.run(debug = True)