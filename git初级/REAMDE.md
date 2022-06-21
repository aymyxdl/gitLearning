##  概述

git 是 分布式版本控制系统

版本控制是一种记录文件内容变化，以便将来查阅特定版本修订情况的系统。

版本控制其实最重要的是可以记录文件修改历史记录，从而让用户能够查看历史版本，方便版本切换。

集中式代表作：SVN


代码托管中心（远程库）

分布式的版本控制系统出现之后,解决了集中式版本控制系统的缺陷:
1. 服务器断网的情况下也可以进行开发（因为版本控制是在本地进行的）
2. 每个客户端保存的也都是整个完整的项目（包含历史记录，更加安全）



第一点解释：会有很多人觉得这一点跟svn没啥区别，两者远程库挂了，都不能进行最新版本的更新合并操作
个人理解：git可以保存之前的版本，然后在本地新建其他的版本分支进行开发，然后最终等远程库好了，进行合并后，这期间所有的版本控制都能同步上去，这是svn做不到的


第二点是git最重要的特点：保存完整的项目。



## git的工作机制

工作区：代码存放的磁盘的目录的位置

暂存区：在工作区写了代码之后，你要让git追踪有这么个代码文件，因此需要你将工作区的文件添加到暂存区（添加：对应add命令）
暂存区是(临时存储)的

本地库：将暂存区的文件提交到本地库之后，这个时候就会生成对应的 历史版本
有了(历史版本)，就意味着删不掉了

远程库：代码托管中心

    (add命令)    (commit)    (push)
工作区  ->  暂存区  ->  本地库  ->  远程库




代码托管中心是基于 网络服务器的远程代码仓库，一般我们简单称为远程库。

局域网
    GitLab（自己公司内部的服务器就是 gitlab）
互联网
    GitHub（外网）
    Gitee 码云（国内网站）



## 安装注意点

注意1：
在安装git的时候可以设置以后git创建的主分支

默认是 master

如果你选择自定义，可以写其他的比如 main
这样以后创建git项目的时候，默认的主分支就是main

(当然，我们选择默认的master)



注意2：
选择后台客户端连接协议：

默认是 OpenSSL协议进行连接
还有window的安全协议（不建议）



注意3：
window和linux的换行符

window:CRLF
linux: LF


注意4:
选择凭据管理器（相当于用户密码验证）



## git常用命令

### git config

git config --global user.name 用户名 设置用户签名
git config --global user.email 邮箱 设置用户签名

这两个命令在安装git后只需要设置一次就行了（不设置的话，推送代码会报错）
设置一次后无须再理会


这个邮箱不会验证，可以用虚拟不存在的
这两个用户签名设置如何查看（在c盘的user->admin文件夹下面有个 .gitcofig文件）


签名的作用是区分不同操作者身份。
用户的签名信息在每一个版本的提交信息中能够看到，以此确认本次提交是谁做的。

Git 首次安装必须设置一下用户签名，否则无法提交代码。
※注意：这里设置用户签名和将来登录 GitHub（或其他代码托管中心）的账号没有任
何关系。



### git init （初始化本地库）

初始化本地库
你想要用git来管理这个目录，你要需要先让git获取这个目录的管理权



执行完命令后，会生成一个 .git文件夹(默认隐藏的)




### git status （查看状态）


untracked files(未被追踪的文件)：红色标注
表明这些文件还在工作区，并未被添加到暂存区


### git add （添加暂存区）

git add 文件名

用来把文件添加到暂存区：这个时候，git就追踪到了这个文件

如果不想这个暂存区提交到版本信息中，可以使用提示命令
git rm --cached <file>

git rm --cached helloword.txt


注意了：这个时候，git只是把文件从暂存区（返回到之前的）工作区了
git并没有修改文件的任何内容
只是不再删除了追踪信息

用git status再次查看，会发现跟没有add之前一样
文件名是红色的

所以，如果不小心add了，又想回退，大胆放心的用 git rm --cached 命令



问题：git rm --cached .
这个命令好像不能用 . 来批量撤销追踪
如果有大批量的文件想要从暂存区撤回到工作区，该怎么操作

### git commit (提交本地库)

git文件添加到暂存区后，但是这个时候还没有 形成历史版本
因此需要提交到本地库，形成历史版本

git commit -m'日志信息'

如果不加-m，也会后续弹出一个框，让你添加日志信息（所以一般都主动加上）




$ git commit -m'testcommit'
[master (root-commit) 9a8a291] testcommit
 1 file changed, 1 insertion(+)
 create mode 100644 1.txt


这次提交本地库，会发现一个 9a8a291 ，这个七位数字，就是本次提交所代表的 版本信息（其实这个是精简的）


git reflog
git log

这两个命令都可以查看提交历史
reflog是精简版的



### vim（修改文件）

vim file

vim hello.txt


（这个命令太难用，用vscode等开发工具修改吧）


### git reset（版本穿梭）

git reflog 查看版本信息
git log 查看版本详细信息


可以先通过查看历史版本信息 确认你要穿梭(回退)的版本，记录对应的版本号
然后使用命令进行 版本穿梭


git reset --hard 版本号
git reset --hard 0d5582a


回退之后，使用 git reflog 命令查看历史记录会发现，你这次的操作也会记录当中
会显示你把当前的主分支指向到了某个版本
0d5582a (HEAD -> master) HEAD@{0}: reset: moving to 0d5582a



Git 切换版本，底层其实是移动的 HEAD 指针，具体原理如下图所示。


而且哪怕你回退到了上几个版本，觉得不满意，也可以继续恢复到之前最新的版本
因为那个版本有 版本信息 在日志中，所以可以任意穿梭，直到满意为止



## 分支操作

### 分支切换

什么是分支？
在版本控制过程中，同时推进多个任务，分化为不同任务，我们就可以创建每个任务的单独分支。

（分支底层其实也是指针的引用）



分支的操作
命令名称                        作用
git branch 分支名               创建分支
git branch -v                   查看分支
git checkout 分支名             切换分支
git merge 分支名                把指定的分支合并到当前分支上






git branch
git branch test   (从当前分支创建一个新分支test：以当前分支的代码为基础创建的副本分支)
git checkout test (切换到刚刚新建的分支：  git checkout -b test2：可以快速创建新分支并切换)
然后在test分支下进行代码开发
(test) git add .
(test) git commit -m'提交到test分支'
git checkout master
git merge test    (这样，本地分支开发就已经合并到了master分支，然后master分支推到远程库就可以同步所以代码了)





git checkout -b test2（相当于做了2步）：
1: git branch test2
2: git checkout test2


### 冲突合并

冲突产生的表现：后面状态为 MERGING

冲突产生的原因：
合并分支时，两个分支在 同一个文件的同一个位置 有 两套完全不同 的修改。
Git 无法替我们决定使用哪一个。必须人为决定新代码内容。





我在test1上面修改了代码，并提交到了本地库
切换到master后


修改master的代码 ，如果没有提交到master本地库，直接merge，不会让你merge，会报提示

master要提交到本地库之后，再merge，才会出现合并冲突，这个时候的文件，是合并后的文件
文件中有conflict冲突标记




git test1 change
<<<<<<< HEAD
master
=======
test1111
>>>>>>> test1



左箭头到等号之间的内容 <<< ... ===
是你当前分支自己修改的内容(master分支)



等号到右箭头之间的内容 === ... >>>
是你要merge的那个分支（一般是别人写的代码的内容） test1分支



编辑有冲突的文件，删除特殊符号，决定要使用的内容
特殊符号：<<<<<<< HEAD 当前分支的代码 ======= 合并过来的代码 >>>>>>> test1



这个时候就修改文件，解决冲突代码之后，再执行add commit操作
（当然你也可以什么都不做，直接add commit,但是冲突代码还在，别人更新后会因为此处报错，导致项目崩溃，被挨骂
所以，一定记住解决冲突后再提交本地库 推送远程库）


你在merge期间，不能提交的时候带上文件名，会失败
$ git commit -m'merge' 1.txt
fatal: cannot do a partial commit during a merge.


因为git无法分辨你要推的是哪个文件，因为使用不带文件名的，默认全部推送

$ git commit -m'merge'





其实merge的底层跟其他操作一样，都是使用 HEAD 的指针所指向的文件

当前所在的分支，其实是由 HEAD决定的。
所以创建分支的本质就是多创建一个指针。
HEAD 如果指向 master，那么我们现在就在 master 分支上。
HEAD 如果执行 test，那么我们现在就在 test 分支上。



## 团队协作

团队内协作：
使用常见的 git 命令


跨团队协作：
会有几个不同的远程库
远程库之间通过fork来拷贝
通过 pull request 来更新



## Git操作

### 创建远程库

命令名称                         作用
git remote -v                   查看当前所有远程地址别名
git remote add 别名 远程地址     起别名
git push 别名 分支               推送本地分支上的内容到远程仓库
git clone 远程地址               将远程仓库的内容克隆到本地
git pull 远程库地址别名           远程分支名 将远程仓库对于分支最新内容拉下来后与当前本地分支直接合并


远程库地址有两种： http协议 和 ssh协议


别名：远程库地址太长了，记不住，可以为它创建别名
代码推送拉取的时候，就可以直接用别名进行操作



git remote -v       注意：这个命令是查看的本地的远程地址别名
我们之前设置远程仓库地址的时候
git remote set-url origin [url]

这里就用了别名，使用了 origin，所以我们推送的时候，才是
git push origin xxx

这个是因果关系，而不是所有的推送都是origin（只有你自己设置了才是origin）
所以如果你有多个推送地址，或者你不想用origin，可以另外设置


--- 推送 本地分支 到 远程库
git push 别名 分支
push操作的最小单位是分支
意味着每次只能操作一个分支进行推送



---
第一次推送会让你输入账号密码
如果你浏览器登录了git，可以通过选择浏览器授权登录
要不然就选择自己输入账号密码输入


--- 拉取 远程库 到 本地库
git pull 远程库 分支


--- 克隆 远程仓库 到 本地

git clone 远程仓库地址


可以到window的凭据管理器中删除git已经保存的账户密码
（因为git只能记住一个用户）




git push 代码需要把角色账号 加入团队，这样才有权限进行代码的推送

### 跨团队协作

视频这里的pull request 是在网站上的图形化界面进行操作的


## SSH免密登录

在 window 系统盘下面的用户文件夹下
使用命令行生成一个 .ssh 文件夹

ssh-keygen -t rsa -C atguiguyueyue@aliyun.com

ssh-keygen   使用的命令，固定写法

-t          指定用哪种加密算法
rsa         指定的一种非对称加密协议
-C          是描述信息
atguiguyueyue@aliyun.com        自己写的描述信息

然后三次回车，就会自动创建出 .ssh 文件夹

---

然后进入 .ssh/ 文件夹，复制 id_rsa.pub 文件内容
然后在github项目创建者的界面下，添加这个加密公钥信息


一般不用SSH，都直接用git的 https地址进行操作




###

idea 的git 项目的忽略文件是 .ingore 结尾的文件
vscode这边前端是 .gitignore 文件


按理来说应该是不分前后端项目的，忽略文件都是以git为准
可能两种都行吧



.gitignore文件中

注意可以用 # 开头来写
*.rar       // 表示忽略所有以 .rar结尾的文件
*.vue       // 要忽视后缀名为什么类型的文件，自己添加




## 国内代码托管中心-码云


这里面讲了gitee 和 gitlab

不过因为是夹杂着idea插件集成来讲，所以我没有怎么听
不过后面如果需要用到的时候，可以再回来听







# 总结

说实话，这个初级教程真的很初级，更多的是将idea怎么集成git项目
git命令讲的很肤浅，也就是那么几个命令




工作区  ->  暂存区  ->  本地库  ->  远程库

git config --global user.name 用户名 设置用户签名
git config --global user.email 邮箱 设置用户签名

git init

git status

git add

git rm --cached <file>

git commit

git reflog

git log

git reset --hard 版本号

git branch 分支名               创建分支
git branch -v                   查看分支
git checkout 分支名             切换分支
git merge 分支名                把指定的分支合并到当前分支上

git remote -v                   查看当前所有远程地址别名
git remote add 别名 远程地址     起别名
git push 别名 分支               推送本地分支上的内容到远程仓库
git clone 远程地址               将远程仓库的内容克隆到本地
git pull 远程库地址别名           远程分支名 将远程仓库对于分支最新内容拉下来后与当前本地分支直接合并

git remote set-url origin [url]







所以，平常用到的git命令的流程如下：


git branch
git branch test   (从当前分支创建一个新分支test：以当前分支的代码为基础创建的副本分支)
git checkout test (切换到刚刚新建的分支：  git checkout -b test2：可以快速创建新分支并切换)
然后在test分支下进行代码开发
(test) git add .
(test) git commit -m'提交到test分支'
git checkout master
git merge test    (这样，本地分支开发就已经合并到了master分支，然后master分支推到远程库就可以同步所以代码了)



https://www.bilibili.com/video/BV1vy4y1s7k6


