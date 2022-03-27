
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/problem/problem","pages/message/message","pages/discuss/discuss","pages/my/my","pages/problem/problemDetail","pages/search/searchProblem","pages/search/searchDiscuss","pages/discuss/discussDetail","pages/login/login","pages/my/problemRecord","pages/my/myInfo","pages/my/modifyPassword","pages/my/modifyEmail","pages/my/infoCenter","pages/my/codeDetail","pages/test","pages/index/rankDetail","pages/problem/mySubmitRecord"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"fontSize":"12px","backgroundColor":"#fff","list":[{"pagePath":"pages/index/index","text":"首页","iconPath":"static/tabbar/home.png","selectedIconPath":"static/tabbar/home-a.png"},{"pagePath":"pages/problem/problem","text":"题库","iconPath":"static/tabbar/list.png","selectedIconPath":"static/tabbar/list-a.png"},{"pagePath":"pages/discuss/discuss","text":"交流区","iconPath":"static/tabbar/discuss.png","selectedIconPath":"static/tabbar/discuss-a.png"},{"pagePath":"pages/my/my","text":"我","iconPath":"static/tabbar/my.png","selectedIconPath":"static/tabbar/my-a.png"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"onlineJudge","compilerVersion":"3.3.11","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/problem/problem","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/message/message","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/discuss/discuss","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/problem/problemDetail","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/search/searchProblem","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/search/searchDiscuss","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/discuss/discussDetail","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/login/login","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/my/problemRecord","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/my/myInfo","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/my/modifyPassword","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/my/modifyEmail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/my/infoCenter","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/my/codeDetail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/test","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/index/rankDetail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/problem/mySubmitRecord","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
