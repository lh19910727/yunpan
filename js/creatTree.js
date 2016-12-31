//通过id找到对应的数据
	function getSelfById(data,id){
		return data.find(function (value){
			return value.id == id;
		})
	}
	//通过指定id找到子数据
	function getChildsById (data,id){
		return data.filter(function (value){
			return value.pid == id;
		})	
	}
	//找到指定id所有的父数据，包含自己
	function getParentsAllById (data,id){
		var arr = [];
		var self = getSelfById(data,id);
		if( self ){
			arr.push(self);
			arr = arr.concat(getParentsAllById(data,self.pid));
		}
		return arr;
	}
		//生成左侧文件夹列表
function creatTree(id){
	var arr = getChildsById (data.files,id);
	//如果arr的长度是0，证明没有子级函数return
	if(!arr.length){
		return '';
	}
	var str = '<ul>';
	arr.forEach(function(value){
		var parentsLength = getParentsAllById (data.files,value.id).length;
		var childs = getChildsById (data.files,value.id);
		var className = childs.length ? "iconBlock":"iconNone";
		str += '<li><h2 class=" '+className+' treetitle" data-id="'+value.id+'" style = "padding-left:'+20*parentsLength+'px" ><i style="transition:0.5s;"></i><span class = "icon-folder-open-o"></span><em class="ellipsis">'+value.title+'</em></h2>';
		str += creatTree(value.id);
		str += '</li>';
	})
	 str += '</ul>';

	 return str;
}
//生成文件夹导航
function creatNav(id){
	var str = '';
	var arr = getParentsAllById(data.files,id);
	var classNav=document.getElementById('classNav');
	arr.reverse();
	arr.forEach(function(value,index){
		str += '<a data-id="'+value.id+'" style="z-index:'+(arr.length-index)+';">'+value.title+'</a>'
	})
	classNav.innerHTML='<span id="checkAll"></span>'+str;
	var a = classNav.getElementsByTagName('a');
	for(var i = 0;i < arr.length;i++){
		if(i == arr.length-1){
			a[i].className='active';
		}
	}
	checkAll = document.getElementById("checkAll")
}
function creatListLi(id){//生成右侧列表图
	var arr = getChildsById (data.files,id);
	var str =  '';
	arr.forEach(function(value){
		str += '<li data-id="'+value.id+'" data-checked="'+value.checked+'"><em data-id="'+value.id+'"></em><div class = "list_text" data-id="'+value.id+'">'+value.title+'</div><div class = "list_choice">';
		for(var i = 0;i<5;i++){
			str += '<a></a>'
		}
		str += '</div></li>';
	})
	return str;
}
function creatLi(id){//生成右侧文件夹缩略图
	var arr = getChildsById (data.files,id);
	var str = '';
	arr.forEach(function(value){
		str += '<li data-id="'+value.id+'" data-checked="'+value.checked+'" class="fileItem"><em class="checkbox"></em><img src = "img/miaov_floder.png" data-id="'+value.id+'"/><span class="ellipsis file-title">'+value.title+'</span><input type = "text" class="file-edtor"/></li>'
	})
	
	return str;
}