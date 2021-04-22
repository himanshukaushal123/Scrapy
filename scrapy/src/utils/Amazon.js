const request = require("request-promise");
const cheerio = require("cheerio");
const downloader = require("node-image-downloader");
const ObjectsToCsv=require("objects-to-csv");
const url = "https://www.amazon.in/s?k=shirts&rh=n%3A1375424031&ref=nb_sb_noss";
const scrapesample = {
    title: "U-TURNMens Slim Fit Shirt",
    rating: "4 out of 5",
    offer_price: "499",
    origional_price: "1999",
    description: "Crafted in a pure cotton fabric, this long-sleeved, regulr",
    url:
        "https://www.amazon.in/Diverse-Printed-Regular-Cotton-DVF01F2L01-263-42_Navy_42/dp/B075KKF5XL/ref=sr_1_1?dchild=1&pf_rd_i=1968024031&pf_rd_m=A1VBAL9TL5WCBF&pf_rd_p=08b03935-0704-4bbd-9894-f9c043ef766b&pf_rd_r=6YXAMFJD4JPDGFJ0P7VJ&pf_rd_s=merchandised-search-17&qid=1618197259&refinements=p_36%3A-49900&rnid=1968024031&s=apparel&sr=1-1",

    package_dimension: "8 x 8 x 3 cm; 400 Grams",
    date_of_manufacure: "30 August 2020",
    manufacturer: " Swastik Health Wear",
    asin: " B0917B969K",
    country_origin: "India",
    department: "Men",
    manufacturer:
        "Swastik Health Wear, Swastik Health Wear, Wazirpur Industrial Area, New Delhi - 110052",
};

let scrapeResults = [];

async function productDetail() {
    try {
        const htmlResult = await request.get(url);
        const $ = await cheerio.load(htmlResult);
        //if ($(".sg-col-4-of-12")) {
            $(".sg-col-4-of-12").each((index, element) => {
                const str = $(element).find(".a-size-mini").text(); // title of product
                var newstr1 = "";

                for (var i = 0; i < str.length; i++) {

                    if (!(str[i] == '\n' || str[i] == '\r')) {

                        newstr1 += str[i];
                    }

                }
                const title = newstr1;
                const rating = $(element).find(".a-icon-alt").text(); // rating of product
                const offer_price = $(element).find(".a-price-whole").text(); //offerprice of product
                const origional_price = $(element).find(".a-offscreen").text(); //origiona price of product
                const original = $(element).find(".a-link-normal").attr("href"); //url of product
                const url = 'https://www.amazon.in/' + original;
                // const img = $(element).find(".s-image").attr("src");
                // // download the image

                // downloader({
                //     imgs: [
                //         {
                //             uri: img
                //         }
                //     ],
                //     dest: "./downloads"
                // })
                //     .then((info) => {
                //         console.log("Download complete")
                //         process.exit(1);

                //     })



                const scrapeResult = { title, rating, offer_price, origional_price, url };
                scrapeResults.push(scrapeResult);
            });
        //}

        //for leptop and fridge type page
        // else {
        //     $(".sg-col-0-of-12").each((index, element) => {
        //         const title = $(element).find(".a-size-mini").find(".a-size-medium").text(); // title of product
        //         var newstr1 = "";

        //         // for (var i = 0; i < str.length; i++) {

        //         //     if (!(str[i] == '\n' || str[i] == '\r')) {

        //         //         newstr1 += str[i];
        //         //     }

        //         // }
        //         // const title = newstr1;
        //         const rating = $(element).find(".a-icon-alt").text(); // rating of product
        //         const offer_price = $(element).find(".a-price-whole").text(); //offerprice of product
        //         const origional_price = $(element).find(".a-offscreen").text(); //origiona price of product
        //         const original = $(element).find(".a-link-normal").attr("href"); //url of product
        //         const url = 'https://www.amazon.in/' + original;
        //         const scrapeResult = { title, rating, offer_price, origional_price, url };
        //         scrapeResults.push(scrapeResult);
        //     });


        // }
        console.log(scrapeResults);


        //console.log(htmlResult);
    } catch (err) {
        console.error(err);
    }
   return scrapeResults;
}

async function product_basic_descrpiton(productwithHeader) {
    return await Promise.all(
        productwithHeader.map(async (job) => {
            try {
                const htmlResult = await request.get(job.url);
                const $ = await cheerio.load(htmlResult);
                const str1 = $("#productDescription").text();
                // console.log(typeof(str));
                var newstr = "";

                for (var i = 0; i < str1.length; i++) {

                    if (!(str1[i] == '\n' || str1[i] == '\r')) {

                        newstr += str1[i];
                    }

                }
                job.description = newstr;



                const str10 = $("#detailBullets_feature_div").children(".a-unordered-list").text().trim();
                var newstr10 = "";
                var newstr20 = "";

                for (var i = 0; i < str10.length; i++) {

                    if (!(str10[i] == '\n' || str10[i] == '\r')) {

                        newstr10 += str10[i];
                    }

                }
                // const des=newstr10;
                const str11 = $("#feature-bullets").children(".a-unordered-list").text().trim();
                for (var i = 0; i < str11.length; i++) {

                    if (!(str11[i] == '\n' || str11[i] == '\r')) {

                        newstr20 += str11[i];
                    }

                }
                // const des2=newstr20;
                job.des = newstr10;
                job.dis2 = newstr20;



                return job;
            } catch (error) {
                console.error(error);
            }
        })
    );
}



async function createCsvFile(data)
{
    const csv = new ObjectsToCsv(data);
 
    // Save to file:
    await csv.toDisk('./amazon.csv');
   
    // Return the CSV file as string:
  
}



async function product_basic() {
    const productwithHeader = await productDetail();
    const productFullData = await product_basic_descrpiton(productwithHeader);
    // console.log(productFullData);
    await createCsvFile(productFullData);
}
product_basic();
// productDetail();