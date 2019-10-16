import re
import json
import demjson
f = open("jipinjiading1.txt", "r", encoding="utf-8")
data = f.readlines()
f.close()
f1 = open("text.txt","a+",encoding='utf-8')
zhangjie = ""
jsonDic = {}
for line in data:
    result = re.search('章', line)
    if result:
        # t = (result.group(0))
        result1 = re.search('第',line)
        if result1 and (len(line) < 20):
            zhangjie = line
            jsonDic[zhangjie] = ''
        if not(result1 and (len(line) < 20)) and len(zhangjie) > 0:
            values = jsonDic[zhangjie]
            if values:
                jsonDic[zhangjie] = jsonDic[zhangjie] + line
            else:
                jsonDic[zhangjie] = line
jsonstr = json.dumps(jsonDic, ensure_ascii=False).encode('utf-8')
text = demjson.decode(jsonstr)
f1.write(text+'\n')
f1.close()