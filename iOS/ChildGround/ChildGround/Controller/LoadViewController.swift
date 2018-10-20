//
//  LoadViewController.swift
//  ChildGround
//
//  Created by Jungyoon Yu on 10/20/18.
//  Copyright © 2018 JungyoonYu. All rights reserved.
//

import UIKit
import SwiftyJSON
import Alamofire
import SVProgressHUD

struct AddressData {
    var quietValue : Double = 0
    var trafficValue : Double = 0
    var safetyValue : Double = 0
}

class LoadViewController: UIViewController {

    let SHINE_URL = "https://apis.solarialabs.com/shine/v1/total-home-scores/reports?"
    let API_KEY = "PxuJn2DYpLkigdkTuOmMi7w8tzKJSMKV"
    
    var currentAddress : String = ""
    var interestAddress : String = ""

    
    @IBOutlet weak var currentAddressLabel: UILabel!
    @IBOutlet weak var interestAddressLabel: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        print (currentAddress)
        
        let currParam : [String:String] = ["address" : String(self.currentAddress), "apikey": API_KEY]
        let intParam : [String:String] = ["address" : String(self.interestAddress), "apikey": API_KEY]
        var currentData : AddressData = AddressData()
        var interestData : AddressData = AddressData()
        
        //API request for current address
        Alamofire.request(SHINE_URL, method: .get, parameters : currParam).responseJSON { response in
            //when retrieval of JSON is successful
            if response.result.isSuccess {
                print ("Success, we got the address data")
                
                //changing value to JSON is made available from SwiftyJSON
                let curr : JSON = JSON(response.result.value!)
                
                print (curr)
                currentData = AddressData(quietValue: curr["totalHomeScores"]["quiet"]["value"].double!, trafficValue: curr["totalHomeScores"]["traffic"]["value"].double!, safetyValue: curr["totalHomeScores"]["safety"]["value"].double!)
                
            } else {
                print ("Error: \(response.result.error!)")
            }
        }
        
        //API request for interest address
        Alamofire.request(SHINE_URL, method: .get, parameters : intParam).responseJSON { response in
            //when retrieval of JSON is successful
            if response.result.isSuccess {
                print ("Success, we got the address data")
                
                //changing value to JSON is made available from SwiftyJSON
                let inte : JSON = JSON(response.result.value!)
                
                print (inte)
                interestData = AddressData(quietValue: inte["totalHomeScores"]["quiet"]["value"].double!, trafficValue: inte["totalHomeScores"]["traffic"]["value"].double!, safetyValue: inte["totalHomeScores"]["safety"]["value"].double!)
                
            } else {
                print ("Error: \(response.result.error!)")
            }
        }
        
    }
    
}
