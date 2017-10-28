// default config
module.exports = {
  port:8787,
  api:{
    auth2_access_token:'https://api.weixin.qq.com/sns/oauth2/access_token',
    unified_order:'https://api.mch.weixin.qq.com/pay/unifiedorder',
    create_menus:'https://api.weixin.qq.com/cgi-bin/menu/addconditional',     
    create_default_menu:'https://api.weixin.qq.com/cgi-bin/menu/create',
    get_menus:'https://api.weixin.qq.com/cgi-bin/menu/get',
    delete_menus:'https://api.weixin.qq.com/cgi-bin/menu/delete',
    get_access_token:'https://api.weixin.qq.com/cgi-bin/token',       
    tag_user:'https://api.weixin.qq.com/cgi-bin/tags/members/batchtagging',
    get_tags:'https://api.weixin.qq.com/cgi-bin/tags/get',
    get_user_info:'https://api.weixin.qq.com/cgi-bin/user/info',
    get_js_api_ticket:'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
    untag_user:'https://api.weixin.qq.com/cgi-bin/tags/members/batchuntagging',
  }
};
 