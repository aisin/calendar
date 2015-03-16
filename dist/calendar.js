/*! CopyRight: Aisin http://github.com/aisin/calendar, Licensed under: MIT */

var Calendar = function (obj){

	var self = this;
	self.ele = typeof obj == 'string' ? document.getElementById(obj) : obj;
	self.buttons = ['<<', '<', '>', '>>'];
	var referDate = new Date();
	self.ye = referDate.getFullYear();
	self.mo = referDate.getMonth()+1;
	self.da = referDate.getDate();
	self.create();

};

Calendar.prototype.create = function(customDate){

	var self = this;
	var today = new Date();
	self.year = today.getFullYear();
	self.month = today.getMonth()+1;
	self.day = today.getDate();

	var startDay, totalDays, startDayWeek;

	startDay = self._getStartDate(customDate || self._format(self.year,self.month));
	totalDays = self._getEndDate(customDate || self._format(self.year,self.month)).getDate();
	
	startDayWeek = startDay.getDay() === 0 ? 7 : startDay.getDay();
	
	var data_mo = self.mo < 10 ? '0' + self.mo : self.mo;
	var data_da = self.da < 10 ? '0' + self.da : self.da;

	var data_month = self.month < 10 ? '0'+self.month : self.month;
	var data_day = self.day < 10 ? '0' + self.day : self.day;
      
    var calendarDom = [
		'<table class="calendars" border="1px" cellpadding="0" cellspacing="0"><thead>',
		'<tr class="cal-hd-up">',
		'<th id="pervYear" colspan="1"></th>',
		'<th id="pervMonth" colspan="1"></th>',
		'<th colspan="3">'+self.ye + '年&nbsp;' + data_mo + '月'+'</th>',
		'<th id="nextMonth" colspan="1"></th>',
		'<th id="nextYear" colspan="1"></th>',
		'</tr>',
		'<tr class="cal-hd-dn"><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th><th>日</th></tr></thead>'];

	for(var i = 1; i <= self._grids(startDayWeek,totalDays); i++){
			
		if(1 == i % 7 ) calendarDom.push('<tr>');
		
		if(i >= startDayWeek && i <= (startDayWeek + totalDays -1)){
		
			if(self.day == (i - startDayWeek + 1)){
		
				if(self.year == startDay.getFullYear() && self.month == startDay.getMonth()+1){
				
					calendarDom.push('<td class="calToday" data-date="'+self.ye+'/'+data_mo+'/'+data_da+'">'+data_da+'</td>');
					
				}else{
				
					calendarDom.push('<td data-date="'+self.ye+'/'+data_mo+'/'+data_da+'">'+data_da+'</td>');
				}
			}else{
				
				calendarDom.push('<td data-date="'+self.ye+'/'+data_mo+'/'+(parseInt(i - startDayWeek + 1)<10 ? '0'+parseInt(i - startDayWeek + 1) : parseInt(i - startDayWeek + 1))+'">' + (parseInt(i - startDayWeek + 1)<10 ? '0'+parseInt(i - startDayWeek + 1) : parseInt(i - startDayWeek + 1)) + '</td>');
			}
			
			if(0 == i % 7) calendarDom.push('</tr>');
		}else
			
			calendarDom.push('<td>&nbsp;</td>');
		
	}

	calendarDom.push('</table>');      
    self.ele.innerHTML = calendarDom.join('');
	self.addBtns();
};

Calendar.prototype._format = function(y, m){

	return y + '/' + m;

};

//Count total girds of the month

Calendar.prototype._grids = function(startDayWeek, totalDays){

	return (Math.ceil((totalDays - (7 - startDayWeek + 1))/7) + 1) * 7;

}

//Add Buttons and Events

Calendar.prototype.addBtns = function(){
  
    var self = this;
	var btnThs = ['pervYear', 'pervMonth', 'nextMonth', 'nextYear'];
	for(var i in btnThs){
	
		var btnTh = document.getElementById(btnThs[i]);
		var btn = document.createElement('input');
		btn.type = 'button';
		btn.value = self.buttons[i];
		btn.className = 'calBtn';
		btnTh.appendChild(btn);

	}

	document.querySelector('#'+btnThs[0]).onclick = function(){

		self.create(new Date(self._format(--self.ye, self.mo)));
	
	};
	
	document.querySelector('#'+btnThs[1]).onclick = function(){

		if (--self.mo < 1) {
			self.ye -= 1;
			self.mo = 12;
		}
		self.create(new Date(self._format(self.ye, self.mo)));
	
	};
	
	document.querySelector('#'+btnThs[2]).onclick = function(){
	
		if (++self.mo > 12) {
		   self.ye += 1;
		   self.mo = 1;
		}
		self.create(new Date(self._format(self.ye, self.mo)));
	
	};

	document.querySelector('#'+btnThs[3]).onclick = function(){
	
		self.create(new Date(self._format(++self.ye, self.mo)));
	
	};
};

Calendar.prototype._isLeapYear = function(year){

	return 0 === year % 400 || (0 === year % 4 && 0 !== year % 100) ? true : false;
	
};

Calendar.prototype._getStartDate = function(date){

	var dt = new Date(date);
	dt.setDate(1);
	return dt;

};

Calendar.prototype._getEndDate = function(date){

	var dt = new Date(date);
	var totalDays = this._maxDayOfDate(parseInt(dt.getFullYear()), parseInt(dt.getMonth()+1));
	dt.setDate(totalDays);
	return dt;

};

Calendar.prototype._maxDayOfDate = function(year, month){
		
	if([1,3,5,7,8,10,12].indexOf(month) >= 0){
	
		return 31;
		
	}else if([4,6,9,11].indexOf(month) >= 0){
	
		return 30;
		
	}else{
	
		return this._isLeapYear(year) ? 29 : 28;
		
	}
};