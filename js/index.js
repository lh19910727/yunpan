
var navRight = document.getElementById('nav_right');
var classFloder = document.getElementById('classFloder');
var list = document.getElementById('list');
var sort = document.getElementById('sort');
var navLeft = document.getElementById('nav_left');
var delated = document.getElementById('delated');
var contentR = document.getElementById('content_right');
var checkAll = document.getElementById('checkAll');
var contentLeft = document.getElementById('content_left');
var classNav = document.getElementById('classNav');
var choiceContent=document.getElementById('choiceContent');
var datas = data.files;
var onoff = true;
var flag = true;
//声明一个全局的id来储存各种点击事件的id值；
var _tagertId = 0;
//获取指定id对应的树形菜单的标题

//设置页面的宽高；
window.addEventListener('resize', function(e) {
	var contentH = e.clientHeight - 130;
	var contentRightW = e.clientWidth - 261;
	content.style.height = contentH + 'px';
	contentR.style.width = contentRightW + 'px';
});
//渲染页面函数
function render(id){
	classFloder.innerHTML = creatLi(id);
	list.innerHTML = creatListLi(id);
	creatNav(id);
}
//页面初始化
classFloder.innerHTML = creatLi(_tagertId);
list.innerHTML = creatListLi(_tagertId);
creatNav(_tagertId);
contentLeft.innerHTML = creatTree(-1);
choiceContent.innerHTML=creatTree(-1);
function getTreeById(id){
	var treetitle =contentLeft.getElementsByClassName('treetitle');
	for(var i=0;i<treetitle .length;i++){
		if(treetitle [i].dataset.id==id){
			return treetitle[i]
		}
	}
}
addClass(getTreeById(0),'active');//class添加不上？？？？=下面重复初始化了
////点击切换缩略图和列表图

var selectedIds = [];
navRight.children[0].onclick = function() {
	//声明数组，把所有选中的li的id放入数组内，切换后把li的id与数组id一致的添加选中效果
	selectedIds = [];
	if(onoff) {
		selectedIds = getSelectedIds(classFloder);
		navRight.children[0].style.backgroundColor = '#55addf';
		navRight.children[0].style.backgroundImage = 'url(./img/aclick.png)';
		list.style.display = 'block';
		classFloder.style.display = 'none';
		//先清空所有的选中效果，给id与数组里存的id一致的添加；
		var ems = list.getElementsByTagName('em');
		//切换选中函数

		//切换前清空之前的选中状态
		for(var i = 0; i < ems.length; i++) {
			ems[i].innerHTML = '';
			ems[i].parentNode.className = '';
			ems[i].flag = false;
		}
		//跟据数组中的id给当文件夹添加选中的样式
		if(selectedIds.length) {
			for(var i = 0; i < selectedIds.length; i++) {
				for(var j = 0; j < ems.length; j++) {

					if(ems[j].dataset.id == selectedIds[i]) {
						ems[j].innerHTML = '√';
						ems[j].parentNode.className = 'active';
						ems[j].flag = true;
					}
				}
			}
		}

	} else {
		selectedIds = getSelectedIds(list);
		var lis = list.getElementsByTagName('li');
		navRight.children[0].style.backgroundImage = 'url(./img/nav8.png)';
		navRight.children[0].style.backgroundColor = '#fff';
		classFloder.style.display = 'block';
		list.style.display = 'none';
		var ems = classFloder.getElementsByTagName('em');

		//切换前清空之前的选中状态
		for(var i = 0; i < ems.length; i++) {
			ems[i].innerHTML = '';
			ems[i].parentNode.className = '';
			ems[i].flag = false;
		}
		//跟据数组中的id给当文件夹添加选中的样式
		if(selectedIds.length) {
			for(var i = 0; i < selectedIds.length; i++) {
				for(var j = 0; j < ems.length; j++) {
					if(ems[j].dataset.id == selectedIds[i]) {
						ems[j].innerHTML = '√';
						ems[j].parentNode.className = 'active';
						ems[j].flag = true;
					}
				}
			}
		}
	}
	onoff = !onoff;
}
sort.children[2].onclick = function() {
		if(classFloder.style.display = 'none') {
			classFloder.style.display = 'block';
			list.style.display = 'none';
			onoff = true;
		}
	}
	//点击按钮使文件夹排序方式改变
navRight.children[1].onclick = function() {
		navRight.children[1].children[0].style.transition = '0.5s'
		if(flag) {
			this.className = 'active';
			sort.style.display = 'block';
			navRight.children[1].children[0].style.transform = 'rotate(180deg)';

		} else {
			this.className = '';
			sort.style.display = 'none';
			navRight.children[1].children[0].style.transform = 'rotate(0deg)';
		}
		flag = !flag;
	}
	//生成左侧文件夹

//左侧文件夹结构初始化

//初始化让所有span下面的ul display为none
	
	
	var h2s = contentLeft.getElementsByTagName('h2');
	for(var i = 0; i < h2s.length; i++) { 
			h2s[i].onoff=true;//给所有的h2s添加开关，如果下一级display为none则开关为true；
	}

var classNav = document.getElementById('classNav');
var none = document.getElementById('none');

//左侧文件夹点击事件
contentLeft.onclick=function(e){
	var target = e.target;
	if(target = parent(target,'.treetitle')){
		_tagertId=target.dataset.id;
	}
	treeClick(e);
	render(_tagertId);
}
function treeClick(e) {
	for(var i = 0; i < h2s.length; i++) { //清除所有给当前添加classname
			removeClass(h2s[i],'active');
		}
	var target = e.target;
	//通过parent函数寻找点击元素带有treetitle的父级，即h2
	if(target = parent(target,'.treetitle')){
		var id = target.dataset.id; //获取当前点击的h2s的id；
		_tagertId = id;
		var h2ss = target.parentNode.parentNode.getElementsByTagName('h2');
		if(target.parentNode.parentNode.previousElementSibling) { //获取上级的id；
			var pid = target.parentNode.parentNode.previousElementSibling.dataset.id;
		}
		//判断当前点击的h2的兄弟节点是否存在
		if(!target.nextElementSibling) {
			//如果当前点击的h2的兄弟节点不存在，none的style display block；
				none.style.display = 'block';
				classFloder.style.display = 'none';
				list.style.display = 'none';
				addClass(target,'active');
		} else {
			//如果当前点击的h2的兄弟节点存在，none的style display none；
			none.style.display = 'none';
			if(onoff) {
				classFloder.style.display = 'block';
			} else {
				list.style.display = 'block';
			}
			if(target.onoff) { //如果开关为true
				for(var i = 0; i < h2ss.length; i++) {
					if(h2ss[i].nextElementSibling) {
						h2ss[i].nextElementSibling.style.display = 'none';
						h2ss[i].children[0].style.transform = 'rotate(0deg)';
						h2ss[i].onoff = true;
					}
				}
				target.nextElementSibling.style.display = 'block';
				target.children[0].style.transform = 'rotate(90deg)';
				addClass(target,'active');
				target.onoff = false;
			} else {
				_tagertId = pid;
				target.nextElementSibling.style.display = 'none';
				target.children[0].style.transform = 'rotate(0deg)';
				removeClass(target,'active');
				target.onoff = true;
			}
			
		}
		
	}
	
}

//导航栏点击事件
var arr = [];
classNav.addEventListener('click',navClick);
function navClick(ev) { //点击导航a标签
	var target = ev.target;
	if(target.nodeName == 'A') {
		var id = target.dataset.id;
		_tagertId = id;
		none.style.display = 'none';
		if(onoff) {
			classFloder.style.display = 'block';
			list.style.display = 'none';
		} else {
			list.style.display = 'block';
			classFloder.style.display = 'none';
		}
		render(_tagertId);
		h2Style(_tagertId);
	} else if(target.nodeName == 'SPAN') { //点击全选按钮
		//有指定class，就删除；没有，就添加。并返回相应的布尔值用变量bl储存
		var bl=toggleClass(target,'checked')
		var arrEms = Array.from(classFloder.getElementsByTagName('em'));
		var arrEmss = Array.from(list.getElementsByTagName('em'));
		var childs=getChildsById(datas,_tagertId);
		//-------------------全选--------------------------------------------------------
		//点击全选判断如果当前的元素下面没有子级，全选按钮不能被选中；
		
		if(!childs.length){
			 return;
		}
		if(bl) {
			if(onoff) {
				arrEms.forEach(function(value) { //缩略图状态下
					addClass(value,'checked');//增加class使em处于选中状态
					addClass(value.parentNode,'active');
					getSelfById(datas,value.parentNode.dataset.id).checked ='true';//改变数据中checked的值，记录当前是否选中
					value.parentNode.setAttribute('data-checked','true');
				})
			} else {
				arrEmss.forEach(function(value) { //列表状态下
					value.innerHTML = '√';
					addClass(value.parentNode,'active');
					getSelfById(datas,value.parentNode.dataset.id).checked ='true';
					value.parentNode.setAttribute('data-checked','true');
				})
			}

		} else {
			if(onoff) {
				arrEms.forEach(function(value) { //缩略图状态下
					removeClass(value,'checked');
					removeClass(value.parentNode,'active');
					getSelfById(datas,value.parentNode.dataset.id).checked ='false';
					value.parentNode.setAttribute('data-checked','false');
				})
			} else {
				arrEmss.forEach(function(value) { //列表状态下
					value.innerHTML = '';
					removeClass(value.parentNode,'active');
					getSelfById(datas,value.parentNode.dataset.id).checked ='false';;
					value.parentNode.setAttribute('data-checked','false');
				})
			}

		}

	}

}
//-------------------------------------------框选-----------------------------------------------------------
//鼠标mousemove创建框选文件夹的div

if(onoff){//判断是在缩略图状态下
	var contentBox=document.getElementById('contentBox');
	
	contentBox.onmousedown=function(e){
		
		//如果目标点是文件夹，如果文件夹处于选中状态ischecked为true，则框选终止
		var isChecked=false;
		if(parent(e.target,'.fileItem')){
			//判断目标源的父级第一个子元素中是否被选中，并转成布尔值赋值给isChecked。如果isChecked为true则为选中状态；
			isChecked=!!hasClass(parent(e.target,'.fileItem').children[0],'checked');
		}
		//如果处于新建状态终止函数执行
		if(newFloder.isCreat) return
		//如果点击的不是左键终函数
		if(e.which!=1){
			return
		}
		var mask=null;//用来框选文件夹的div
		var sketchDiv = null //文件夹移动时剪影
		var imposterDiv = null//伪装者 随鼠标移动的div，为防止鼠标在文件夹上按下并抬起触发文件夹click事件
		var hitDiv=null;//碰撞到的div（文件夹被拖进的div）
		var spans=classFloder.getElementsByTagName('span');
		var fileItem=document.querySelectorAll('.fileItem');
		//判断该是处于重命名状态下，让函数终止执行
		for(var i=0;i<spans.length;i++){
			if(spans[i].isReName){
				return
			}
		}
		
		var X=e.clientX;
		var Y=e.clientY;
		var left=contentBox.getBoundingClientRect().left;
		var top=contentBox.getBoundingClientRect().top;
		//给文件夹添加绝对定位
		var lis=classFloder.getElementsByTagName('li');
		var ems=classFloder.getElementsByTagName('em');
		var arrEms=Array.from(ems);
		var selectArr=whoSelect();//被选中的元素集合；
		document.onmousemove=function(e){
		//---------------------------------移动文件夹-----------------------------------------
			//判断当在文件夹上点击时，如果文件夹处于选中状态，移动文件夹
			if(isChecked){
				//如果鼠标移动距离超过5px在移动文件夹，防止与点进下一级发生冲突
				if(Math.abs(e.clientX-X)<5&&Math.abs(e.clientY-Y)<5){
					return
				}
				if(!sketchDiv){
					//生成剪影
					sketchDiv=document.createElement('div');
					sketchDiv.className='drag-helper ui-draggable-dragging';
					sketchDiv.innerHTML=`<div class="icons">
						             <i class="icon icon0 filetype icon-folder"></i>  
							        </div>
							        <span class="sum">${selectArr.length}</span>;`
					document.body.appendChild(sketchDiv);
					//生成红色div随鼠标移动，为防止鼠标在文件夹上按下并抬起触发文件夹click事件
                   imposterDiv=document.createElement('div');
			        imposterDiv.style.cssText = `   width: 10px;
			        								height: 10px;
			        								background: red;
			        								position: absolute;
			        								left:0;
			        								top:0;
			        								opacity:1;
			        							`;
			       	 document.body.appendChild(imposterDiv);
				}
				 //让虚影和红色div随鼠标移动
			       	 sketchDiv.style.left=e.clientX+15+'px';
			       	 sketchDiv.style.top=e.clientY+15+'px';
			       	 imposterDiv.style.left=e.clientX-5+'px';
			       	 imposterDiv.style.top=e.clientY-5+'px';
			       //文件夹移动过程检测碰撞
			       hitDiv=null;//没碰撞之前移动过程中hitDiv的值一直都是null。碰撞上的时候给它赋值
			      a:for(var i=0;i<fileItem.length;i++){
			       		var onoff=true;
			       		//判断文件夹移动过程中碰到的是不是已被选中的，如果是状态不改变，如果不是增删class
			       		for(var j=0;j<selectArr.length;j++){
			       			if(fileItem[i]==selectArr[j]){
                          //	onoff=false;
								continue a;
			       			}
			       		}
			       		//如果碰撞的是已经选中的文件夹跳出本次for循环；
                          //	if(onoff==false) continue
			      		if(!peng(imposterDiv,fileItem[i])){
			      			addClass(fileItem[i],'active');
			      			hitDiv=fileItem[i];//把当前的元素赋值给hitDiv
			      		}else{
			      			removeClass(fileItem[i],'active');
			      		}
			       }
				return
				
			}
			//鼠标移动过程中创建div
			var maskLeft=Math.min(e.clientX-left-1,X-left+1);
			var maskTop=Math.min(e.clientY-top-1,Y-top+1);
			//判断如果移动到一定距离才开始生成div
			if(Math.abs(e.clientX-X)>20||Math.abs(e.clientY-Y)>20){
				//如果鼠标移动过程中判断mask是否存在，如果mask存在不让他重新生成
				if(!mask){
					mask=document.createElement('div');
					mask.className='mask1';
					contentBox.appendChild(mask);
				}
				mask.style.width=Math.abs(e.clientX-X)+'px';
				mask.style.height=Math.abs(e.clientY-Y)+'px';
				mask.style.left=maskLeft+'px';
				mask.style.top=maskTop+'px';
				//检测碰撞
				for(var i=0;i<lis.length;i++){
					if(!peng(mask,lis[i])){
						addClass(lis[i],'active')
						addClass(lis[i].children[0],'checked')
						lis[i].children[0].flag=false;
					}else{
						removeClass(lis[i],'active');
						removeClass(lis[i].children[0],'checked')
						lis[i].children[0].flag=true;
					}
				}
			}
			
			//判断是否全部被框选选中
			isAllChecked();
			
		}
		document.onmouseup=function(){
			//当鼠标抬起时把拖动的文件夹放到相应的文件夹上
			if(hitDiv){//判断鼠标是在文件夹上抬起的
				var onoff=true;
				//判断如果名字重复移动不成功；
				var fileId=hitDiv.dataset.id;
				//将选中的元素的id存入数组selectedId中
				var selectedId=selectArr.map(function(value){
					return value.dataset.id
				})
				for(var i=0;i<selectedId.length;i++){
					var self=getSelfById(datas,selectedId[i]);
					var isExit=isTitleExist(datas,self.title,fileId);
					if(!isExit){
						self.pid=fileId;
						classFloder.removeChild(selectArr[i]);
					}else{
						onoff=false;
					}
				}
				if(onoff==false){
					fullTip('faild','部分文件夹移动失败，重名了');
				}
				//鼠标抬起清除碰撞的div的样式；
				removeClass(hitDiv,'active');
				//渲染左侧区域
				contentLeft.innerHTML = creatTree(-1);
			}
			
			//如果ems是被选中的给他父级的自定义属性改变
			for(var i=0;i<ems.length;i++){
				if(hasClass(ems[i],'checked')){
					getSelfById(datas,ems[i].parentNode.dataset.id).checked ='true';
					ems[i].parentNode.setAttribute('data-checked','true');
				}
			}
			//鼠标抬起删除选框；并把变量mask清空,如果变量不清空，每次点击一次都会再次生成，从而影响点击进入下一级文件的事件
			if(mask){
				contentBox.removeChild(mask);
				mask=null;
			}
			
			document.onmousemove=null;
			//把鼠标的onmouseup事件取消掉
			document.onmouseup=null;
			//鼠标抬起清掉虚影
			if(sketchDiv){
				document.body.removeChild(sketchDiv);
				document.body.removeChild(imposterDiv);
				sketchDiv=null;
				imposterDiv=null;
			}
		}
		return false;//清除默认样式
	}
	
}
//判断是否全选
function isAllChecked(){
var ems = classFloder.getElementsByTagName('em');
	var bl = Array.from(ems).every(function(item){
			return hasClass(item,"checked");
		});
		//bl为true，说明所有的单选都被选中

		if( bl ){
			addClass(checkAll,"checked");

		}else{
			removeClass(checkAll,"checked");
		}
}
//新建之前如果文件夹处于被选中状态，还让它是选中的
function isCheckedFn(){
	var lis=classFloder.getElementsByTagName('li');
	for(var i=0;i<lis.length;i++){
		if(lis[i].dataset.checked==='true'){
			addClass(lis[i],'active');
			addClass(lis[i].children[0],'checked')
		}
		
	}
}

//右侧文件夹点击事件
classFloder.onclick = function(e) { //缩略图-------------单选-------------------------
	var target = e.target;
	//用时间代理方法，判断目标源如果是li或者img就切换到子数据，如果是文件夹单选；
	if(target.nodeName.toLowerCase() == 'li' || target.nodeName.toLowerCase() == 'img') {
		//如果点击的是fileItem文件夹并且文件夹是选中状态，则不能进入下一级
		var isChecked=false;
		if(parent(e.target,'.fileItem')){
			isChecked=!!hasClass(parent(e.target,'.fileItem'),'active')
		}
//		if(isChecked) return;
		var targetId = target.dataset.id;
		_tagertId = targetId;
		render(_tagertId);
		h2Style(_tagertId);
	} else if(target.nodeName.toLowerCase() == 'em') {
		toggleClass(target,'checked')//缩略图状态下单选
		toggleClass(target.parentNode,'active')
		//判断是否全选，如果全选全选按钮加上classname
		isAllChecked()
			//缩略图状态下全选；
			if(hasClass(target,'checked')){
				//改变数据中的checked的状态
				getSelfById(datas,target.parentNode.dataset.id).checked ='true';
				//改变行间的data-checked属性
				target.parentNode.setAttribute('data-checked','true');
			}else{
				getSelfById(datas,target.parentNode.dataset.id).checked ='false';
				target.parentNode.setAttribute('data-checked','false');
			}
		
	}else if(target.nodeName=='SPAN'){//---------------------------------重命名------------------------------------------------------------
			target.isReName=true;
			if(!target.isReName){
				return
			}
			var id=target.parentNode.dataset.id;
			target.style.display='none';
			target.nextElementSibling.style.display='block';
			target.nextElementSibling.focus();
			target.nextElementSibling.value=target.innerHTML;
			target.nextElementSibling.onblur=function(){
				target.style.display='block';
				this.style.display='none';
				var value=this.value.trim()
				//判断如果名字不改变
				if(value==getSelfById(data.files,id).title){
					
				}else if(value==''){//如果名字为空
					target.innerHTML=getSelfById(data.files,id).title;
					fullTip('faild','命名不能为空');
					return
					//如果同一父级下已经存在相同的名字
				}else if(isTitleExist(datas,value,getSelfById(data.files,id).pid)){
						target.innerHTML=getSelfById(data.files,id).title;
						fullTip('faild','命名不能重复');
						return
				}else{
					fullTip('success','命名成功');
				}
				for(var i=0;i<datas.length;i++){
					if(datas[i].id==id){
						datas[i].title=value;
					}
				}
				choiceContent.innerHTML=creatTree(-1);
				contentLeft.innerHTML = creatTree(-1);
				render(_tagertId);
				chushihua(_tagertId);
				target.isReName=false;
			}
	}
}
//---------------------------------点击重命名-----------------------------------------------------
//那些文件被选中了
	var ems=classFloder.getElementsByTagName('em');
	function whoSelect(){
		return Array.from(ems).filter(function (item){
			return hasClass(item,"checked");	
		}).map(function (item){
			return parent(item,".fileItem");
		})
	}
var re_obj = {};
var reName=document.getElementById('reName');
reName.onclick=function(e){
	reName.isReName=true;
	var hasChecked=whoSelect();
	if(hasChecked.length==1){
		var id=hasChecked[0].dataset.id;
		re_obj.element = hasChecked[0];
		re_obj.fileTitle = re_obj.element.querySelector(".file-title");
		re_obj.fileEdtor = re_obj.element.querySelector(".file-edtor");
		re_obj.fileTitle.style.display='none';
		re_obj.fileEdtor.style.display='block';
		re_obj.fileEdtor.focus();
	}else if(hasChecked.length>1){
		fullTip('faild','只能对单个文件进行重命名');
		reName.isReName=false;
	}else if(hasChecked.length<1){
		fullTip('faild','请选择文件夹');
		reName.isReName=false;
	}
	e.cancelBubble=true;
	//点击document判断命名是否成功
	document.onmousedown=function(){
		if(!reName.isReName){
					return
				}
		re_obj.fileTitle.style.display='block';
		re_obj.fileEdtor.style.display='none';
		var value=re_obj.fileEdtor.value.trim()
		//判断如果名字不改变
		if(value==getSelfById(data.files,id).title){
			
		}else if(value==''){//如果名字为空
			re_obj.fileTitle.innerHTML=getSelfById(data.files,id).title;
			fullTip('faild','命名不能为空');
			reName.isReName=false;
			return
			//如果同一父级下已经存在相同的名字
		}else if(isTitleExist(datas,value,getSelfById(data.files,id).pid)){
				re_obj.fileTitle.innerHTML=getSelfById(data.files,id).title;
				fullTip('faild','命名不能重复');
				reName.isReName=false;
				return
		} 
		fullTip('success','命名成功');
		for(var i=0;i<datas.length;i++){
			if(datas[i].id==id){
				datas[i].title=value;
			}
		}
		choiceContent.innerHTML=creatTree(-1);
		contentLeft.innerHTML = creatTree(-1);
		render(_tagertId);
		chushihua(_tagertId);
		reName.isReName=false;
	}
}

list.onclick = function(e) { //列表图点击事件
	var target = e.target;
	target.className = 'active';
	if(target.nodeName.toLowerCase() == 'li' || target.nodeName.toLowerCase() == 'div') {
		var targetId = target.dataset.id;
		_tagertId = targetId;
		render(_tagertId);
		h2Style(_tagertId);
	} else if(target.nodeName.toLowerCase() == 'em') {
		emClick(target); //列表状态下单选
		var ems = Array.from(list.getElementsByTagName('em'));
		allChecked(ems); //列表状态下全选

	}
}
//----------------------------------------------------------删除文件夹（点击导航栏删除按钮）-----------------------------------------------------------
var delate = document.getElementById('delate');
//点击删除按钮删除弹框弹出
delate.onclick=function(){
	selectedIds = [];
	//获取选中元素的id，存到数组中
	if(onoff) {
		
		selectedIds = getSelectedIds(classFloder);

	} else {
		selectedIds = getSelectedIds(list);
	}
	//判断如果没有被选中的函数
	if(!selectedIds.length){
		fullTip('faild','请选择要删除的文件夹')
		return
	}else{
		dialog({
			title:"删除文件",
			content:"<div style='padding: 10px;'>确定要删除这个文件夹吗？已删除的文件可以在回收站找到</div>",
			okFn:function(){
				//指定多个id，删除多个id下面的子孙数据
				delectChildsAll(datas,selectedIds);
				//重新渲染页面
				render(_tagertId);
				choiceContent.innerHTML=creatTree(-1);
				contentLeft.innerHTML = creatTree(-1);
				chushihua(_tagertId);
				fullTip('success','删除成功')
						}
					})
				}
	
	}
//点击删除弹框内的任何一个按钮让弹框消失；
for(var i=0;i<alertdelated.children.length;i++){
	alertdelated.children[i].addEventListener('click',function(){
		alertdelated.style.display='none';
	})
}
//-----------------------------------------------------------------新建文件夹------------------------------------------------------------------

newFloder.onmouseup=function(){
	//给元素添加自定义属性判断是否处于新建状态，如果是true则处于新建状态
	newFloder.isCreat=true;
	var id=	_tagertId;//找出全局的id，用变量存起来
	var num=Math.floor(Math.random()*1000);//生成一个随机数num，切不能与数据中的id重复
	//遍历datas，给数组添加新数据，新数据的id不等于datas里的每一项的id，新数据的pid等于全局的id；
	for(var i=datas.length-1;i>=0;i--){
		if(datas[i].id==id&&num!=datas[i].id){
			datas.unshift({id:num,pid:id,title:'',type:"file"})
		}
	}
	//判断是none的状态，当新建文件夹时把none隐藏
	if(none.style.display=='block'){
		none.style.display='none';
		if(onoff){
			classFloder.style.display='block';
		}else{
			list.style.display='block';
		}
	}
	//重新渲染页面
	render(_tagertId);
	//如果li是被选中的还让它处于选中状态
	isCheckedFn();
	//让input显示并给input添加焦点
	var lis=classFloder.getElementsByTagName('li');
		lis[0].children[2].style.display='none';
		lis[0].children[3].style.display='block';
		lis[0].children[3].focus();
		//当新建文件夹失去焦点时
		document.onmousedown=function(){
			creatFile()
		}
		//点击回车键失去焦点
		document.onkeyup=function(ev){
			if(ev.keyCode==13){
				creatFile()
			}
		}
		
		function creatFile(){
			//当失去焦点时如果文件夹处于新建状态则继续执行下面函数，否则终止函数执行
			if(!newFloder.isCreat) return;
			var lis=classFloder.getElementsByTagName('li');
			//改变数据内容，找出数据中id与新建文件夹对应的一项，改变数据title值让他等于新建文件夹的名字
			datas[0].title=lis[0].children[3].value;
			//遍历数据，同一父级下的子级命名有重复的不能新建需要重新命名
			for(var i=1;i<datas.length;i++){
				if(datas[i].pid==datas[0].pid&&datas[i].title==datas[0].title){
					//如果新建不成功数据中删除此项
					datas.splice(0,1);
					render(_tagertId);
					//如果li是被选中的还让它处于选中状态
					isCheckedFn();
					//判断是否处于全选状态，如果处于全选状态新建不成功还是全选的
					isAllChecked();
					fullTip('faild','新建失败')
					newFloder.isCreat=false;
					return
				}
			}
			//判断如果新建文件夹的名字是空的，新建文件夹不成功，把数据中相应的数据删除，重新渲染文件区域
			if(lis[0].children[3].value.trim()===''){
				
 				datas.splice(0,1);
				render(_tagertId);
				//如果li是被选中的还让它处于选中状态
				isCheckedFn();
				//判断是否处于全选状态，如果处于全选状态新建不成功还是全选的
				isAllChecked();
				fullTip('faild','新建失败');
				//新建失败后判断当前的id下是否有子数据，如果没有让none显示
				var childs=getChildsById(datas,_tagertId);
				if(!childs.length){
					none.style.display='block';
					classFloder.style.display='none';
					list.style.display='none';
				}
				
				newFloder.isCreat=false;
				return
			}
			//如果新建成功文件夹元素相应状态的改变，各个区域重新渲染；
			lis[0].children[2].style.display='block';
			lis[0].children[3].style.display='none';
			lis[0].children[2].innerHTML=lis[0].children[3].value;
			//重新渲染页面
			render(_tagertId);
			choiceContent.innerHTML=creatTree(-1);
			contentLeft.innerHTML = creatTree(-1);
			chushihua(_tagertId);
			fullTip('success','新建成功');
			//焦点事件解绑；
//			lis[0].children[3].onblur=null;
			//文件夹新建完成之后关闭开关让元素属性改成false
			newFloder.isCreat=false;
		}
		
		
}
//---------------------------------------------------移动文件夹-----------------------------------------------------------------------
var moveTo=document.getElementById('moveTo');
var moveStatus=true;
//点击移动按钮事件
moveTo.onclick=function(){
	//处于移动状态
	moveStatus=true;
	//当前点击的treeTitle的id
	var fileId=null;
	var selectArr=whoSelect();
	//如果没有被选中的文件夹函数终止
	if(!selectArr.length) {
		fullTip('faild','请选择要移动的文件夹')
		return
	};
	//生成弹框内容
	dialog({
		title:'移动文件夹',
		content:'<div id="choiceContent" class="moveContent">'+creatTree(-1)+'</div>',
		okFn:function(){
			//如果
			if(moveStatus){
				return true;
			}else{
				var onoff=true;
				//判断如果名字重复移动不成功；
				for(var i=0;i<selectedId.length;i++){
					var self=getSelfById(datas,selectedId[i]);
					var isExit=isTitleExist(datas,self.title,fileId);
					if(!isExit){
						self.pid=fileId;
						classFloder.removeChild(selectArr[i]);
					}else{
						onoff=false;
					}
				}
				if(onoff==false){
					fullTip('faild','部分文件夹移动失败，重名了');
					return false;
				}
				contentLeft.innerHTML = creatTree(-1);
			}
		}
		
	});
	var moveContent=document.querySelector('.moveContent');
	//给微云添加初始样式
	var weiyun=moveContent.getElementsByClassName('treetitle')[0];
	var error=document.querySelector('.error');
	var currentElement=weiyun;
	var selectedId=[];
	addClass(weiyun,'active');
	//找到所有被选中的h2的id
	for(var i=0;i<selectArr.length;i++){
		selectedId.push(selectArr[i].dataset.id)
	}
	//找到所有被选中的h2的子数据及自身
	var selectedAllData=getChildsAllByIdarr(datas,selectedId);
	//利用事件代理给h2添加点击事件
	moveContent.onclick=function(e){
		var target=e.target;
		if(target=parent(target,'.treetitle')){
			fileId=target.dataset.id;
		}
		//当前点击的元素添加样式
		removeClass(currentElement,'active');
		addClass(target,'active');
		currentElement=target;
		//找到当前点击的h2对应的数据selfData
		var oneData=getSelfById(datas,fileId);
		//所选中的文件夹中第一个数据，为了判断他的pid是否等于当前点击元素的id，如果等于则证明文件已存在改文件夹下文件不能移动
		var selfData=getSelfById(datas,selectedId[0]);
		var onoff=true;
		//所选中的文件不能移动到它父级下面
		if(oneData.id==selfData.pid){
			error.innerHTML='所选文件已存在于文件夹下';
			setTimeout(function(){
				error.innerHTML='';
			},1000)
			moveStatus=true;
			return;
		}
		//不能移动到自身还有子文件夹下面
		for(var i=0;i<selectedAllData.length;i++){
			if(fileId==selectedAllData[i].id){
				onoff=false;
				break;
			}
		}
		//如果onoff等于false证明当前选择的文件夹存在与选中的文件夹的数组中，移动失败
		if(onoff==false){
			error.innerHTML='不能移动到自身或者子文件夹下';
			setTimeout(function(){
				error.innerHTML='';
			},1000)
			moveStatus=true;
			return;
		}else{//如果不存在于所选的文件夹中移动成功，moveStatus状态改成false。移动框可以被关闭
			moveStatus=false;
		}
	}
}

