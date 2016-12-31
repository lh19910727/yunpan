function h2Style(id){
	for(var i=0;i<h2s.length;i++){
		var h2Id=h2s[i].dataset.id;
		removeClass(h2s[i],'active');
		if(h2s[i].nextElementSibling){
			var h2ss = h2s[i].nextElementSibling.getElementsByTagName('h2');
		}
		//判断h2的id是否等于当前点击的元素的id
		if(h2Id == id){
			//点击之前先清空所有子级的id
			for(var j=0;j<h2ss.length;j++){
				if(h2ss[j].nextElementSibling){
					h2ss[j].nextElementSibling.style.display='none';
					h2ss[j].children[0].style.transform = 'rotate(0deg)';
					removeClass(h2ss[j],'active');
					h2ss[j].onoff=true;
					}
			}
			addClass(h2s[i],'active');
			h2s[i].children[0].style.transform = 'rotate(90deg)';
			h2s[i].onoff=false;
			//判断h2的兄弟节点是否存在，如果存在就让他展开，如果不存在就让none的style display block
			if(h2s[i].nextElementSibling){
				h2s[i].nextElementSibling.style.display='block';
				
			}else{
				none.style.display = 'block';
				classFloder.style.display = 'none';
				list.style.display = 'none';
			}
		}
		
	}
}
//点击缩略图和列表图按钮控制文件夹选中状态函数
function getSelectedIds(obj){
	var arrIds=[];
	var lis = obj.getElementsByTagName('li');
	//切换选中函数
	for(var i=0;i<lis.length;i++){
		if(hasClass(lis[i],'active')){
			arrIds.push(lis[i].dataset.id);
		}
	}
	return arrIds;
}
//重命名，及删除后左侧初始化
function chushihua(id){
	var arrh2Ids=getParentsAllById (datas,id);
	var h2s=contentLeft.getElementsByTagName('h2');
	for(var i=0;i<arrh2Ids.length;i++){
		for(var j=0;j<h2s.length;j++){
		var h2sId=h2s[j].dataset.id;
		if(h2sId==id){
				addClass(h2s[j],'active')
			}
		if(arrh2Ids[i].id==h2sId&&h2s[j].nextElementSibling){
			h2s[j].children[0].style.transform='rotate(90deg)'
			h2s[j].nextElementSibling.style.display='block';
			h2s[j].onoff=false;
			}
		}
	}
	
}
 //判断元素是否有当前的class;
function hasClass(element,className){
	var classArr = element.className.split(" ");
	for( var i = 0; i < classArr.length; i++ ){
		if( classArr[i] === className ){
			return true;
		}
	}
	return false;
}
//给元素添加class
function addClass(element,className){
			if( !hasClass(element,className) ){
				element.className += " "+ className;
			}
		}
//删除元素指定的class
function removeClass(element,className){
	if( hasClass(element,className) ){
		var classArr = element.className.split(" ");
		for( var i = classArr.length-1; i >= 0; i-- ){
			if( classArr[i] === className){
				classArr.splice(i,1);
			}
		}
		element.className = classArr.join(" ");

	}
}	
//找元素的所有父级元素中有指定class或id或tagName的父级
function parent(element,attr){
	//先找到attr的第一个字符
	var firstChar = attr.charAt(0);
	if( firstChar === "." ){

		while(element.nodeType !== 9 && !hasClass(element,attr.slice(1))){
			//element没有指定的class，那么element就为父级，继续向上找
			element = element.parentNode;
		}
	}else if(firstChar === "#"){
		while(element.nodeType !== 9 && element.id !== attr.slice(1)){
			//element没有指定的class，那么element就为父级，继续向上找
			element = element.parentNode;
		}
	}else{
		while(element.nodeType !== 9 && element.nodeName !== attr.toUpperCase()){
			//element没有指定的class，那么element就为父级，继续向上找
			element = element.parentNode;
		}
	}

	return element.nodeType === 9 ? null : element;

}
	//有指定class，就删除；没有，就添加。
function toggleClass(element,className){
			if(hasClass(element,className) ){
				removeClass(element,className);
				return false;
			}else{
				addClass(element,className);
				return true;
			}
		}
//在指定id的所有的子数据中，是否存在某一个title
	// 存在 true
	// 不存在 false
	function isTitleExist(data,value,id){
		var childs = getChildsById(data,id);  //先找到指定id的所有子级
		return childs.findIndex(function(item){
			return item.title === value;
		}) !== -1;
	}
	//通过指定id，找到这个id的所有的子孙数据，放在数组中
	function getChildsAll(data,id){
		var arr = [];
		var self = getSelfById(data,id);
		arr.push(self);
		//在子数据
		var childs = getChildsById(data,self.id);
		childs.forEach(function (value){
			arr = arr.concat(getChildsAll(data,value.id));
		})

		return arr;
	}
	//指定多个id，找到这些多个id的每一个数据的子孙数据
	function getChildsAllByIdarr(data,idArr){
		var arr = [];
		idArr.forEach(function (value){
			//arr.push(handle.getChildsAll(data,value));	
			arr = arr.concat(getChildsAll(data,value));
		})
		return arr;
	}
	//指定多个id，删除多个id下面的子孙数据
	function delectChildsAll(data,idArr){
		//所有的子孙数据
		var childsAll = getChildsAllByIdarr(data,idArr);
		//循环data，拿到data的每一项，跟childsAll每一项对比
		for( var i = 0; i < data.length; i++ ){
			for( var j = 0; j < childsAll.length; j++ ){
				if( data[i] === childsAll[j] ){
					data.splice(i,1);
					i--;
					break;
				}
			}
		}
	}
	function peng(obj1,obj2){
	var pos1=obj1.getBoundingClientRect();
	var pos2=obj2.getBoundingClientRect();
	return    pos1.left>pos2.right||pos1.right<pos2.left||pos1.top>pos2.bottom||pos1.bottom<pos2.top
}
	var fullTipBox = document.querySelector(".full-tip-box");
	var text = fullTipBox.querySelector(".text");
function fullTip(className,message){

	//先拉倒-32 在过渡到0
	fullTipBox.style.transition = "none";
	fullTipBox.style.top = "-41px";
	fullTipBox.className = 'full-tip-box';

	setTimeout(function (){
		addClass(fullTipBox,className);
		fullTipBox.style.transition = ".3s";
		fullTipBox.style.top = "0";	
	},0)

	text.innerHTML = message;

	//延时上去的定时器只能有一个
	clearTimeout(fullTipBox.timer);
	fullTipBox.timer = setTimeout(function (){
		fullTipBox.style.top = "-41px";

	},2000)	
}