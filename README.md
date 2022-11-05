# 8thwall_localtest

8thwallプロジェクトをローカルで動かしてみたテストプロジェクトです。


githubpagesでホスティングしています。  
https://thedesignium.github.io/8thwall_localtest/

<img src="https://user-images.githubusercontent.com/65954422/177927696-744256ec-89fc-4b11-9b31-3f0064290b31.png" height="250" width="250">

install
`npm install`

watch
`npm run watch`

build
`npm run build`

</br>
</br>
ローカルで動かすための手順メモ

1. 8thwallでセルフホスティングでプロジェクトを作成
2. setting→app keyをコピー
3. index.html内にapp keyをコピー  
  `src="//apps.8thwall.com/xrweb?appKey=<app key>"` 
4. 8thwallが配布しているサーバーアプリを実行
    1. ./sarveフォルダに移動して、
    2. npm install  
    3. cd ../ 
    4. ./serve/bin/serve -d ./  
    or　ⅲの後に、
    4. chmod u+x runserve.command
    5. runserve.commandファイルから起動可能
5. 発行されたurl(例:`https://192.168.0.101:8080`)を8thwallのプロジェクトページのドメインに設定

option: eslintの設定    
  'npx eslint --init'
