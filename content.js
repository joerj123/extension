function detect()
{
    // Find a link with Shopify.com in it
    var shopify = document.querySelector('[href*="shopify.com"]').href ;
    if (shopify == null) {
    } else {

        // Turn the first 23 characters into a string
        result = shopify.toString().substring(0, 23);
        console.log(result);

        // Check if the string matches Shopify's known paths and alert if it's a Shopify site
        if (result == "http://cdn.shopify.com/") {
            alert("this is a shopify site");
            chrome.browserAction.setIcon({
                path : "images/logo_green.png"
            });
        } else if (result == "https://cdn.shopify.com") {
            alert("this is a Shopify site");
            chrome.browserAction.setIcon({
                path : "logo_green.png"
            });
        } else if (result == "//cdn.shopify.com/s/fil") {
            alert("this is a Shopify site");
            chrome.browserAction.setIcon({
                path : "images/logo_green.png"
            });
        } else if (result == "https://fonts.shopifycd") {
            alert("this is a Shopify site");
            chrome.browserAction.setIcon({
                path : "images/logo_green.png"
            });
        } else {
        }
    }
}

detect();