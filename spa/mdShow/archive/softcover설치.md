# use softcover

## summary [ref](http://blog.hostilefork.com/mobi-pdf-epub-softcover-ubuntu/)

install ruby

```
\curl -sSL https://get.rvm.io | bash -s stable --ruby --rails
rvm install ruby-dev
```

dependency

```
sudo apt-get install g++
sudo apt-get install libcurl3 libcurl3-gnutls libcurl4-openssl-dev build-essential
```

softcover

```
sudo gem install softcover --pre --no-ri --no-rdoc
```

additonal program

```
sudo apt-get install imagemagick default-jre inkscape phantomjs calibre texlive-full -y
```

install nodejs

```
sudo apt-get install nodejs
cd /usr/local/bin
sudo ln -s /usr/bin/nodejs node
```

Install EpubCheck

```
cd ~
wget https://github.com/IDPF/epubcheck/releases/download/v3.0/epubcheck-3.0.zip
unzip epubcheck-3.0.zip
rm epubcheck-3.0.zip
```

Install Amazon KindleGen

```
cd ~
wget http://kindlegen.s3.amazonaws.com/kindlegen_linux_2.6_i386_v2_9.tar.gz
tar -zxvf kindlegen_linux_2.6_i386_v2_9.tar.gz
rm kindlegen_linux_2.6_i386_v2_9.tar.gz
cd /usr/local/bin
sudo ln -s ~/kindlegen_linux_2.6_i386_v2_9/kindlegen kindlegen
```
