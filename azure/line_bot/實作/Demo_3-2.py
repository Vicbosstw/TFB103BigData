
# create games dictionary
games = {'小瓦隆' : None, 
         '雨聲' : None,
         '龍捲風' : None}

# run for 100 times
for i in range(1, 100):
    
    msg = input('輸入訊息：')
    current_user_id = '123abc'
    
    # implement reservation
    if msg == '想看遊戲種類':
        game_list = []
        for game, user_id in games.items():
            if user_id is None:
                game_list.append(game)
        game_text = '尚可預約遊戲：\n'
        for game in game_list:
            game_text = game_text + game + '\n'
        print(game_text)
    elif msg[0:3] == '想預約':
        game_name = msg[3:]
        found = False
        for game, user_id in games.items():
            if game == game_name:
                found = True
                if user_id is None:
                    games[game_name] = current_user_id
                    print('已為您預約完成：', game)
                else:
                    print('此遊戲已被預約！抱歉')
        if found == False:
            print('並沒有此款遊戲')
    elif msg == '想取消預約':
        for game, user_id in games.items():
            if user_id == current_user_id:
                games[game] = None
                print('已為您取消預約')
    elif msg == '結束':
        break
    else:
        print('您好！請問需要什麼樣的服務？')
    print('------------------')
        
        