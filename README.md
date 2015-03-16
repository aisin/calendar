# calendar

A simple JavaScript calendar.

最近使用日历插件，搜了很多发现大都是基于 `jQuery` 的，用起来很好用，但单单使用一个日历的话还需要引入 `jQuery`，有点臃肿。所以打算使用原生的 `JavaScript` 写一个。目前是雏形，只有基本功能，接下来会做成两种，一种是 `DatePicker`，一种是可以关联 `json` 显示日程，并会在功能上做得更加易用一些。

### Simple Guide

```js
window.onload = function(){
	
	new Calendar('elementId');

};
```