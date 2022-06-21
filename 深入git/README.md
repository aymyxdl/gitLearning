## 

git 是用来做 版本控制的


--
svn的缺点：

svn服务器单点故障，一旦坏了，所有的历史版本记录没有了

而其他的客户端只会存放自己最新的版本
（他们没有服务器的历史记录）


--

而git，哪怕是各自的客户端，都会有项目创建以来的所有版本记录
哪怕服务器炸了， 也可以重每个客户端恢复

还有很重要的一点，服务器down机的时候
git可以在本地创建一个新的本地分支，拷贝代码进行开发
或者可以不切换分支，一边写一边提交到本地库
如果服务器好了，发现写的代码有问题，可以不需要全部推翻，可以回滚到写的对的那个git记录





--

svn和git存储的对比

svn每次只记录了文件更新的那一部分
比如A文件第一次提交，更改了2行，svn就只记录更改的这两行
这就会导致一个问题，svn如果一个文件提交了上百次，
如果需要回滚到第一次提交的记录，那么它需要先回到99次，回滚这次更新的记录
再回滚到98次，再回滚到97次，以此，回滚到第一次的时候，需要把这一百次都回滚一次




而git每次提交存储都是完整的文件，这样，如果需要回滚到第一次，直接把指针回滚指向第一次的版本
这样，回滚速度非常的快

有人觉得git保存所有版本的副本，会导致空间非常大
但是因为git的压缩算法做到了极致，所以整体大小仅仅只比svn大一点点




## 初始化

git清屏命令
clear   // git bash 是linux内核

window是


git config --global user.name damu
git config --global user.email damu@example.com

这两个命令用来设置你的用户名和邮箱（不会验证邮箱，只是作为你git提交记录的署名标志）
别人看到这条git提交记录，会知道是谁提交的，如何联系对方邮箱

其中 --global 不是固定的，有三个级别
--system            对应操作系统
--global            对应当前window用户
或者不写             对应当前项目（每个项目单独配置）

这里要注意优先级：项目最高，没有才去找global，再去找system

有个问题，我没有设置global，提交代码报错（是因为没有设置system，导致最后也没找到才报错吗？）


--

Git  提供了一个叫做 git config 的命令来配置或读取相应的工作环境变量。
而正是由这些环境变量，决定了 Git 在各个环节的具体工作方式和行为。
这些变量可以存放在以下三个不同的地方：


/etc/gitconfig 文件：系统中对所有用户都普遍适用的配置。
若使用 git config 时用 --system 选项，读写的就是这个文件。 
 
~/.gitconfig 文件：用户目录下的配置文件只适用于该用户。
若使用 git config 时用 --global 选项，读写的就是这个文件。 
 
.git/config 文件：当前项目的 Git 目录中的配置文件
（也就是工作目录中的 .git/config 文件）
这里的配置仅仅针对当前项目有效。 
每一个级别的配置都会覆盖上层的相同配置


--

要检查已有的配置信息，可以使用命令 
git config --list   // 在最后会看到username 和 email


删除配置信息
git config --global --unset user.email



## linux命令


区域：
工作区
暂存区
版本库


git本质上是一个数据库

工作区是一个沙箱环境
（git不会帮你管理工作区环境，爱删删，爱改改，随便你做什么）




初始化项目
git init

.git文件夹就是仓库
在项目中做的任何修改都会存放到这个文件夹中来

hooks                目录包含客户端或服务端的钩子脚本； 
info                 包含一个全局性排除文件 
logs                 保存日志信息 
objects              *目录存储所有数据内容； 
refs                 *目录存储指向数据的提交对象的指针（分支） 
config               文件包含项目特有的配置选项 
description          用来显示对仓库的描述信息 
HEAD                 *文件指示目前被检出的分支 
index                *文件保存暂存区信息

*表示很重要



hooks：
这个文件夹下面有几个钩子文件，这些文件是可以进行编程的（说明git也是可插拔的设计：意思就是可以去写插件）
比如 pre-commit.simle 这个钩子，可以在里面写程序
让我们在从工作区往暂存区 提交之前，去做一些处理
暂存区往版本库提交的时候，也可以触发钩子做事件的处理


info：
用来处理那些不需要被git管理的文件夹
在里面做个配置就行


logs：
默认没有，后面在使用git的时候，会产生一些日志信息


*objects：
相当于数据库，所有的东西都存在这里


*refs:
和分支有关


config：
配置文件：项目级别的配置文件


*head：
也和分支有关

*index：
和暂存区有关




--

基础的linux命令


clear           清除屏幕 
echo            往控制台输出信息  echo 'test content' > test.txt 
ll              将当前目录下的  子文件&子目录平铺在控制台 
find  目录名：  将对应目录下的子孙文件&子孙目录平铺在控制台 
find  目录名  -type f  ：将对应目录下的文件平铺在控制台 
rm    文件名  ：  删除文件 
mv    源文件  重命名文件:  重命名 
cat   文件的 url :  查看对应文件的内容 
vim   文件的 url(在英文模式下) 
    按  i  进插入模式    进行文件的编辑     
    按  esc  键&按:键  进行命令的执行 
    q!      强制退出（不保存） 
    wq      保存退出 
    set nu  设置行号




echo：
输出信息，相当于前端的console.log()
echo '1234': 会就在下一行显示 1234

有的人觉得这个命令很无聊，没啥用，但是可以用来创建文件

echo '1234' > test.txt
这样会在当前目录下创建一个test.txt 文件，并在里面写入1234


--

ll  (两个小写字母 L)
可以看到当前路径下的目录和文件（不会显示隐藏文件）



find ./
可以看到当前目录下面的所有文件
包括隐藏文件和文件夹里面的文件（子孙文件）


clear
清屏



rm file.txt


mv file.txt file666.txt






--




## git对象

学git： 两条主线

第一条主线
三个区域：工作区、暂存区、版本库

第二条主线
三个对象；git对象、树对象、提交对象





Git对象：
git的核心部分是一个简单的键值对数据库。
你可以向该数据库插入任意类型的内容，它会返回一个键值，通过该键值可以在任意时刻再次检索该内容



命令：
echo 'test content' | git hash-object -w --stdin


固定格式:
echo 'xxxx' | git hash-object -w --stdin


作用：将xxx的内容存储到 git数据库中


hash-object     表示操作数据库（键值对： key-value 对应 hash-object）
-w              对应刚刚的命令 hash-object：是用来写入的(应该是write的缩写)
                如果没写 -w，单纯的就是返回对应的键值
--stdin         表示这条命令从标准输入读取内容
                若不指定此选项，则须在命令尾部给出待存储文件的路径



$ echo 'test content' | git hash-object --stdin
d670460b4b4aece5915caf5c68d12f560a9fe3e4

如果不写 -w，则会返回  'test content' 这个字符串对应的哈希值


$ echo 'test content' | git hash-object --stdin -w
d670460b4b4aece5915caf5c68d12f560a9fe3e4

加上-w，则会在 .git/objects 这个文件夹下面多出一个文件
d6/70460b4b4aece5915caf5c68d12f560a9fe3e4
使用之前命令返回的哈希的前两位作为 文件夹的名字
后面的作为 文件的名字

-w，才会写入git数据库



如果通过cat命令去读取刚刚的那个文件，则会显示乱码
因为需要通过git的特定命令去读取写入git数据库的文件




--

根据键值拉取数据：
命令：
git cat-file -p 哈希值

-p 选项可指示该命令自动判断内容的类型，并为我们显示格式友好的内容

eg:
git cat-file -p d670460b4b4aece5915caf5c68d12f560a9fe3e4



git cat-file -t d670460b4b4aece5915caf5c68d12f560a9fe3e4
blob

使用 -t 查看这个键值对的类型，会发现是 blob 类型
blob类型的对象就是 一个 key-value 的键值对
它的值存放在object里面，这个文件的hash作为key
所以才是 hash-object



--

对一个文件进行简单的版本控制:

创建一个新文件并将其内容存入数据库 
命令： 
$ echo 'hello world version 1' > v1.txt
$ git hash-object -w v1.txt
warning: LF will be replaced by CRLF in v1.txt.
The file will have its original line endings in your working directory
8524f85583216c3ad58edb53005990a65a56660b



这样就将文件写入到了git数据库中


通过命令查看一下我们刚刚存入数据库的文件
git cat-file -t 8524f85583216c3ad58edb53005990a65a56660b


接着，我们继续修改一下v1.txt

vim v1.txt
在第二行写入 hello world version 2


但是这个时候，我们并没有把更新后的v1.txt 文件存入到git数据库
因此，还是要执行 hash-object 写入命令

$ git hash-object -w v1.txt
warning: LF will be replaced by CRLF in v1.txt.
The file will have its original line endings in your working directory
5da48d55454727387d5b05af67e2c48cf9083eab


这个时候就已经写入了git数据库了
然后再次查看这个文件
$ git cat-file -p 5da48d55454727387d5b05af67e2c48cf9083eab
hello world version 1
hello world version 2


会发现 hello world version 1 也在文件中
表明这句话存了两次
因此说明，git保存文件，并不是存储 增量
而是重新存了一遍
不过因为极致压缩，因此容量不大



但是这样的操作在实际开发中并不现实
不可能每改动一下文件，就自己手动操作存储到数据库


问题： 
1. 记住文件的每一个版本所对应的 SHA-1 值并不现实 （而且一个版本应该对应多个文件的变动）
2. 在 Git 中，文件名并没有被保存——我们仅保存了文件的内容 （无法代表快照）
（而且，没有文件名，就无法通过名字来读取文件，只能通过hash值来读取，太麻烦了）


注意 
当前的操作都是在对本地数据库进行操作  不涉及暂存区
（我们这里直接从 工作区 存到了 版本库，跳过了暂存区）

git对象，无法代表我们项目的一次快照

解决方案：数对象



## 树对象

树对象（tree object）
它能解决文件名保存的问题，也允许我们将多个文件组织到一起。



Git 以一种类似于  UNIX  文件系统的方式存储内容。
所有内容均以 树对象 和 数据对象(git 对象) 的形式存储，
其中树对象对应了  UNIX  中的目录项，
数据对象(git 对象)则大致上对应文件内容。
一个树对象包含了一条或多条记录
（每条记录含有一个指向 git 对象或者子树对象的  SHA-1  指针，
以及相应的模式、类型、文件名信息）。
一个树对象也可以包含另一个树对象。


我们可以通过
update-index；write-tree；read-tree 
等命令来构建树对像并塞入到暂存区。





git update-index --add --cacheinfo 100644 


假设我们做了一系列操作之后得到一个树对像：
操作：
1. 利用命令 update-index 创造缓存区，并通过 write-tree 命令生成树对像。
git update-index --add --cacheinfo 100644 文件hash 文件名.类型
git write-tree


文件模式为
    100644，表明这是一个普通文件 
    100755，表示一个可执行文件； 
    120000，表示一个符号链接。 

--add 选项： 
    因为此前该文件并不在暂存区中  首次需要—add

--cacheinfo 选项： 
    因为将要添加的文件位于 Git 数据库中，而不是位于当前目录下  所有需要—cacheinfo



git ls-files s      // 查看当前暂存区

$ find .git/objects -type f     // 查看 objects 文件夹下面类型为 file 的文件
.git/objects/56/0a3d89bf36ea10794402f6664740c284d4ae3b



=====

eg:

$ echo 'test.txt v1' > test.txt         // 新建test.txt
$ git hash-object -w test.txt           // 写入文件到git数据库，返回hash值
560a3d89bf36ea10794402f6664740c284d4ae3b

// 利用update-index 命令 为 test.txt 文件创造一个暂存区（这个是底层做的事情，我们平常用的命令都是封装了的）
$ git update-index --add --cacheinfo 100644 560a3d89bf36ea10794402f6664740c284d4ae3b test.txt           


$ git ls-files -s                       // 创建暂存区后，就会发现暂存区多了一个文件
100644 560a3d89bf36ea10794402f6664740c284d4ae3b 0       test.txt        （显示hash 对应的文件名）

// 但是这个时候查看版本库中，会发现并没有新增对象（56 对应之前的 hash-object）
$ find .git/objects -type f             
.git/objects/56/0a3d89bf36ea10794402f6664740c284d4ae3b

//说明 update-index 只是在暂存区造了东西，但是没在版本库中造东西


// 使用 write-tree 命令 给暂存区 创造一个快照，生成一个树对象，再存放到数据库中去
$ git write-tree
06e21bb0105e2de6c846725a9a7172f57dd1af96

$ git cat-file -t 06e21bb0105e2de6c846725a9a7172f57dd1af96  // 查看此文件的类型，会发现是一个 树对象 类型
tree

// 再次查看数据库，会发现对了一个对象，新增的那个是树对象
$ find .git/objects -type f
.git/objects/06/e21bb0105e2de6c846725a9a7172f57dd1af96   // 树对象 是暂存区的快照
.git/objects/56/0a3d89bf36ea10794402f6664740c284d4ae3b   // git对象 只存内容


// git write-tree 才是帮我们真正生成暂存区快照的（也可以看作是项目快照）
// git对象代表文件的一次次版本
// tree对象代表文件的一次次版本


// 再次查看暂存区，会发现，write命令 把暂存区的内容 写入到版本库后，并不会清空暂存区的内容
$ git ls-files -s
100644 560a3d89bf36ea10794402f6664740c284d4ae3b 0       test.txt


$ echo 'new v1' > new.txt
$ git hash-object -w new.txt            // 再次创建 new.txt,并写入到数据库
eae614245cc5faa121ed130b4eba7f9afbcc7cd9        // 要先创造git对象，才能再去创造tree对象

$ find .git/objects -type f             // 查看数据库，有新增的 new.txt 对应的git对象
.git/objects/06/e21bb0105e2de6c846725a9a7172f57dd1af96
.git/objects/56/0a3d89bf36ea10794402f6664740c284d4ae3b
.git/objects/ea/e614245cc5faa121ed130b4eba7f9afbcc7cd9


$ cat test.txt
test.txt v1
$ vim test.txt
$ cat test.txt              // 修改test.txt 新增了一句话
test.txt v1
test.txt v2


$ git hash-object -w test.txt       // 修改了文件后，再次写入数据库
c31fb1e89d8b6b3ef34cdb5a2f999d6e29b822ba

$ find .git/objects -type f         // 查看数据库
.git/objects/06/e21bb0105e2de6c846725a9a7172f57dd1af96      // test.txt 树对象（其实是workspace项目的第一个版本）
.git/objects/56/0a3d89bf36ea10794402f6664740c284d4ae3b      // test.txt v1版本 git对象
.git/objects/c3/1fb1e89d8b6b3ef34cdb5a2f999d6e29b822ba      // test.txt V2版本 git对象
.git/objects/ea/e614245cc5faa121ed130b4eba7f9afbcc7cd9      // new.txt 文件的第一个版本 git对象



// 这个时候，新增了一个 new.txt, test.txt 也更改了， 我觉得项目到这里可以上线了，于是要生成第二次快照

$ git ls-files -s
100644 560a3d89bf36ea10794402f6664740c284d4ae3b 0       test.txt

$ git update-index --add --cacheinfo 100644 c31fb1e89d8b6b3ef34cdb5a2f999d6e29b822ba test.txt

$ git ls-files -s
100644 c31fb1e89d8b6b3ef34cdb5a2f999d6e29b822ba 0       test.txt


$ git update-index --add --cacheinfo 100644 eae614245cc5faa121ed130b4eba7f9afbcc7cd9 new.txt

$ git ls-files -s
100644 eae614245cc5faa121ed130b4eba7f9afbcc7cd9 0       new.txt
100644 c31fb1e89d8b6b3ef34cdb5a2f999d6e29b822ba 0       test.txt

// 现在，暂存区有两个文件了，说明什么？说明暂存区的文件不是整体覆盖，而是文件覆盖（不然就会只有一个最新的new.txt）
// 而且现在只有一个树对象，因为那几个文件都是在同一个暂存区里面
// 另外，这里要注意，上面 --add eae614245 new.txt 如果文件名写错了，写成test.txt，会把存在的文件覆盖掉
// 因此，底层命令很容易写错（以后我们肯定不会用底层命令，而是用封装的高层命令，但是必须要懂底层命令）

$ git write-tree
9d74ec4055e0f1edc1921d749c250380ca7b5ebd

$ find .git/objects -type f
.git/objects/06/e21bb0105e2de6c846725a9a7172f57dd1af96
.git/objects/56/0a3d89bf36ea10794402f6664740c284d4ae3b
.git/objects/9d/74ec4055e0f1edc1921d749c250380ca7b5ebd      // 多了这个文件，就是我们刚才新生成的树对象
.git/objects/c3/1fb1e89d8b6b3ef34cdb5a2f999d6e29b822ba
.git/objects/ea/e614245cc5faa121ed130b4eba7f9afbcc7cd9

// 这里五个记录对应我们的两个版本，也有可能十个对象对应两个版本，也可能1万个
// 但是最少是4个对象对应两个版本（思考一下）


// 到这里，就了解了什么是树对象，什么是git对象






## 提交对象



继续上面的操作：


刚刚我们生成了一个新的树对象，是用 test.txt(v2版本) 和 new.txt 这两个文件所组成的 第二个版本

其实，我们还可以把第一个版本的快照（树对象），取出来，加入到第二个树对象，使其合并成为第三个树对象

// 把第一个项目的快照读取出来
$ git read-tree --prefix=bak 06e21bb0105e2de6c846725a9a7172f57dd1af96

$ git ls-files -s
// 会发现，暂存区多了一个对象（第一个项目的备份）
100644 560a3d89bf36ea10794402f6664740c284d4ae3b 0       bak/test.txt        
100644 eae614245cc5faa121ed130b4eba7f9afbcc7cd9 0       new.txt
100644 c31fb1e89d8b6b3ef34cdb5a2f999d6e29b822ba 0       test.txt

// 然后创建新的树对象
$ git write-tree
17d1ee3eac87d38448e7ff2cc92e88ed4e9aa094        // 第三个树对象


这个时候三棵树分别是

一、
06e21b      // 第一个版本（只包含 版本1 的test.txt ）

二、
9d74ec      // 第二个版本（包含 版本2 的test.txt 和 new.txt）

三、
17d1ee      // 这个要注意，这个包含 06e21b（一）
            // eae614 c31fb1 （并不是二，二是树对象，而这个包含的是二里面对应的两个文件）




问题 
现在有三个树对象（执行了三次 write-tree），
分别代表了我们想要跟踪的不同项目快照。
然而问题依旧：若想重用这些快照，你必须记住所有三个 SHA-1  哈希值。

并且，你也完全不知道是谁保存了这些快照，在什么时刻保存的，
以及为什么保存这些快照。
而以上这些，正是提交对象（commit object）能为你保存的基本信息





$ find .git/objects -type f
.git/objects/06/e21bb0105e2de6c846725a9a7172f57dd1af96
.git/objects/17/d1ee3eac87d38448e7ff2cc92e88ed4e9aa094          // 刚刚生成的第三个树对象
.git/objects/56/0a3d89bf36ea10794402f6664740c284d4ae3b
.git/objects/9d/74ec4055e0f1edc1921d749c250380ca7b5ebd
.git/objects/c3/1fb1e89d8b6b3ef34cdb5a2f999d6e29b822ba
.git/objects/ea/e614245cc5faa121ed130b4eba7f9afbcc7cd9


// 通过 cat-file 命令查看刚刚的第三个树对象

$ git cat-file -p 17d1ee3eac87d38448e7ff2cc92e88ed4e9aa094
040000 tree 06e21bb0105e2de6c846725a9a7172f57dd1af96    bak
100644 blob eae614245cc5faa121ed130b4eba7f9afbcc7cd9    new.txt
100644 blob c31fb1e89d8b6b3ef34cdb5a2f999d6e29b822ba    test.txt

// 结果是三个对象的描述信息


提交对象 
我们可以通过调用 commit-tree 命令创建一个提交对象，
为此需要指定一个树对象的  SHA-1  值，
以及该提交的父提交对象（如果有的话  第一次将暂存区做快照就没有父对象）



我们这里用 第一个版本 作为实验

$ echo 'first commit' | git commit-tree 06e21bb0105e2de6c846725a9a7172f57dd1af96
03b50115d8b5cf2050c11b338b736432908ed0b5        
// 这个提交对象的hash是随机的，不会是根据hash计算出来的（因为你在重复一下刚刚的命令，回发现返回结果变了）

$ git cat-file -t 03b50115d8b5cf2050c11b338b736432908ed0b5
commit      // 查看03b5 ，发现是 commit 类型的对象


$ git cat-file -p 03b50115d8b5cf2050c11b338b736432908ed0b5
tree 06e21bb0105e2de6c846725a9a7172f57dd1af96
author linshuang <925846699@qq.com> 1653919478 +0800
committer linshuang <925846699@qq.com> 1653919478 +0800

first commit


// 这时候会发现 提交对象 就是对 树对象 进行一下包裹，给 树对象 加上一些解释
// 比如，作者是谁，谁提交的，还有提交的注释


// echo 'first commit' | git commit-tree 06e21bb0105e2de6c846725a9a7172f57dd1af96
// 格式： echo 注释信息 | git commit-tree 树对象


// 将 第二个版本 提交，并指定父对象为 第一次提交的对象
$ echo 'second commit' | git commit-tree 9d74ec40 -p 03b50115
ec34d34cbf190a64a4e6c4925cc68f5f347d35ad








这些表明：真正代表一个项目的是谁？

一个commit 对象（提交对象）不光光包含了项目的版本，还包含了当前版本的一些信息
对于我们来讲，我们不需要直接访问树对象，也不需要访问git对象
我们只需要访问提交对象。

但是，究其本质，真正意义上代表一个版本的 应该是 树对象
树才能算真正的一次版本的快照
提交对象只是对它进行了一次封装：给了一些注释信息

但是，提交对象有个非常重要的信息：
提交对象是链式的
这就说明，它能把所有的版本串起来




而且git存储的版本不是增量，而是快照
它存储了我们所有文件的修改版本原件
想要回滚极其简单，找到对应的hash，跳过去就行














