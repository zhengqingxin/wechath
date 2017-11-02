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
    get_tag:'https://api.weixin.qq.com/cgi-bin/tags/get',
    get_user_info:'https://api.weixin.qq.com/cgi-bin/user/info',
    get_js_api_ticket:'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
    untag_user:'https://api.weixin.qq.com/cgi-bin/tags/members/batchuntagging',
    create_tag:'https://api.weixin.qq.com/cgi-bin/tags/create',
    edit_tag: 'https://api.weixin.qq.com/cgi-bin/tags/update',
    delete_tag:'https://api.weixin.qq.com/cgi-bin/tags/delete',
    get_tag_user:'https://api.weixin.qq.com/cgi-bin/user/tag/get',
    batch_tag_user:'https://api.weixin.qq.com/cgi-bin/tags/members/batchtagging',
    batch_untag_user:'https://api.weixin.qq.com/cgi-bin/tags/members/batchuntagging',
    
  }
};
 