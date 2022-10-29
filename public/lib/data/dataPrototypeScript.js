User=(p)=>{var thisOb=this;['hoten','email','maAcv','uid','rowIdx','chucdanh','donvi','maquyen'].forEach((k)=>{thisOb[k]=p[k]});}
setMainDataUser=(user)=>{mainData.user=user}
var mainData = {
	user:{},
	sucoList:[{
		id:{docId:'',maAcv:''},
		donvi:{i:'Đội Thiết bị Thông tin Dẫn đường',c:''},
		giayphep:[],
		ccNgoaingu:[],
		ccDthl:[],
	}],
	temp:{list:[],type:''},
	support:{storage:false},
	view:{state:'mine'},
	flags:{loadCache:true},
	db: new FirestoreDB(),
};
//tag: chua dao tao/ban dau/dinh ky, het han nam nay, 
testDulieu=()=>{
	var items=[{
		id:{docId:'xxxx11231',maAcv:'ACV015141'},
		canhan:{hoten:'Phạm Đức Phú Quang',chucdanh:'Kỹ sư',sdt:'0987906605',email:'quangbk1912@gmail.com',gioitinh:'Nam',dob:'19/12/1993',pob:'Vĩnh Phúc',quequan:'Quỳnh Ngọc - Quỳnh Phụ - Thái Bình',donviCongtac:'Đội Thiết bị Cơ điện đèn sân bay - Trung tâm Khai thác khu bay Nội Bài',vitriCongtac:'ANS/ALS',trinhdoDaotao:'Thạc sỹ khoa học kỹ thuật cơ khí động lực, Kỹ sư kỹ thuật hàng không',diachiHientai:'Phòng 1502-C4- Khu đô thị Mỹ Đình I - Phường Cầu Diễn - Q.Nam Từ Liêm - Hà Nội',img:''},
		donvi:{i:'Đội Thiết bị Cơ điện đèn sân bay',c:'CDD'},
		congviec:[{stt:1,thoigian:'',vitrilamviec:'',ghichu:''}],
		coban:[{stt:1,ten:'',thoigian:'',diadiem:'',vanbang:{ten:'',img:''},ghichu:''}],
		taicho:[{stt:1,linked:'courseList.id',ketqua:{tomtat:'',chitiet:[{stt:1,noidung:'',thoigian:'',danhgia:'',giaovien:'',}],img:''}}],
		tags:'Ban đầu,Hết hạn năm nay,Từ 28/02/2016 Đến 28/02/2018',
		nangdinh:[{stt:1,ten:'BT, BD NDB',ngaythi:'26/12/2016',thoihan:{tu:'28/02/2016',den:'28/02/2018'}}],
		suco:[{stt:1,thoigian:'',noidung:'',hinhthucXuly:''}],
		nhanxet:{noidung:''},
		hlvien:[{stt:1,noidung:'',thoigian:'',coso:'',ghichu:''}],
	},
	];
	mainData.hocvienList = items;
	updateListDulieu();
}