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

    //to check if data is retrieved
    var flag = 0
    
    @IBOutlet weak var currentAddressLabel: UILabel!
    @IBOutlet weak var decisionLabel: UILabel!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let group = DispatchGroup()
        
        let currParam : [String:String] = ["address" : String(self.currentAddress), "apikey": API_KEY]
        let intParam : [String:String] = ["address" : String(self.interestAddress), "apikey": API_KEY]
        var currentData : AddressData = AddressData()
        var interestData : AddressData = AddressData()
        
        SVProgressHUD.show(withStatus: "Loading")
        
        print("1111111111111111")
        //API request for current address
        group.enter()
        Alamofire.request(SHINE_URL, method: .get, parameters : currParam).responseJSON { response in
            //when retrieval of JSON is successful
            if response.result.isSuccess {
                print ("Success, we got the address data")
                
                //changing value to JSON is made available from SwiftyJSON
                let curr : JSON = JSON(response.result.value!)
                
                //print (curr)
                if curr["totalHomeScores"]["quiet"]["value"].double != nil {
                    currentData = AddressData(quietValue: curr["totalHomeScores"]["quiet"]["value"].double!, trafficValue: curr["totalHomeScores"]["traffic"]["value"].double!, safetyValue: curr["totalHomeScores"]["safety"]["value"].double!)
                } else {
                    self.flag = 1
                }
                
                if curr["error"].string != nil{
                    SVProgressHUD.showInfo(withStatus: "Wrong Address(es) Input")
                    SVProgressHUD.dismiss(withDelay: 2)
                }
                if (self.flag == 1){
                    SVProgressHUD.showInfo(withStatus: "Wrong Address(es) Input")
                    SVProgressHUD.dismiss(withDelay: 2)
                }
                
            } else {
                print ("Error: \(response.result.error!)")
            }
            group.leave()
        }
        print("22222222222222222222")
        group.enter()
        //API request for interest address
        Alamofire.request(SHINE_URL, method: .get, parameters : intParam).responseJSON { response in
            //when retrieval of JSON is successful
            if response.result.isSuccess {
                print ("Success, we got the address data")
                
                //changing value to JSON is made available from SwiftyJSON
                let inte : JSON = JSON(response.result.value!)
                
                //print(inte)
                
                if inte["totalHomeScores"]["quiet"]["value"].double != nil {
                    interestData = AddressData(quietValue: inte["totalHomeScores"]["quiet"]["value"].double!, trafficValue: inte["totalHomeScores"]["traffic"]["value"].double!, safetyValue: inte["totalHomeScores"]["safety"]["value"].double!)
                } else {
                    self.flag = 1
                }
                
                if (self.flag == 1){
                    SVProgressHUD.showInfo(withStatus: "Wrong Address(es) Input")
                    SVProgressHUD.dismiss(withDelay: 2)
                }
                
            } else {
                print ("Error: \(response.result.error!)")
            }
            group.leave()
        }
        
        print("3333333333333")
        //end of API calling
        
//        while(currentData.quietValue == 0.0 || interestData.quietValue == 0.0){
//            print("sleeping")
//        }
        
        
        
        group.notify(queue: .main) {
            print("Start the value checking")
            var scoreText : String = ""
            
            if (currentData.quietValue != 0.0 && interestData.quietValue != 0.0){
                let currentSafety = currentData.safetyValue * 0.45;
                let currentTraffic = currentData.trafficValue * 0.35;
                let currentQuiet = currentData.quietValue * 0.2;
                let currentSafetyScore = currentSafety + currentTraffic + currentQuiet;
                
                let newSafety = interestData.safetyValue * 0.45;
                let newTraffic = interestData.trafficValue * 0.35;
                let newQuiet = interestData.quietValue * 0.2;
                let newSafetyScore = newSafety + newTraffic + newQuiet;
                
                let difference = newSafetyScore - currentSafetyScore;
                
                print (currentSafetyScore)
                print(newSafetyScore)
                print(difference)
                //minimal difference
                if(0 <= difference && difference < 10) {
                    if (currentTraffic < newTraffic){
                        scoreText = scoreText + ("Difference: \(newSafety - currentSafety). Your interested home has a higher Traffic Score, meaning there is less congestion on the roads. With less congestion, it is safer for children to get out and play in the home you are interested in. \n\n")
                    } else if(currentTraffic > newTraffic) {
                        scoreText = scoreText + ("Difference: \(newSafety - currentSafety). The home you are living in has a higher Traffic Score, meaning there is less congestion on the roads. With less congestion, it is safer for children to get out and play in the home you are interested in. \n\n")
                    }
                        
                    if (currentQuiet < newQuiet){
                        scoreText = scoreText + ("Difference: \(newQuiet - currentQuiet). The home you are interested in has a higher Quiet Score, so the home is further from factors like major high-traffic roads. \n\n")
                    } else if (currentQuiet > newQuiet) {
                        scoreText = scoreText + ("Difference: \(newQuiet - currentQuiet). The home you are living in has a higher Quiet Score, so your home is further from factors like major high-traffic roads. \n\n")
                    }
                        
                    if (currentSafety < newSafetyScore) {
                        scoreText = scoreText + ("Difference: \(newSafety - currentSafety). The home you are interested in has a higher Safety Score. Cars in the area drive safer than near your home. \n\n")
                    } else if (currentSafety > newSafetyScore) {
                        scoreText = scoreText + ("Difference: \(newSafety - currentSafety). The home you are living in has a higher Safety Score. Cars in the area drive safer than near your interested home. \n\n")
                    }
                    scoreText = scoreText + ("All in all, the house you are interested in is slightly safer for children than your current home. \n\n")
                    self.decisionLabel.text = "TL,DR: Interested house is safer."
                }
                
                //sizable difference
                else if(10 <= difference && difference < 30) {
                    if (currentTraffic < newTraffic){
                        scoreText = scoreText + ("Difference: \(newTraffic - currentTraffic). Your interested home has a higher Traffic Score, meaning there is less congestion on the roads. With less congestion, it is safer for children to get out and play in the home you are interested in. \n\n")
                    } else if(currentTraffic > newTraffic) {
                        scoreText = scoreText + ("Difference: \(newTraffic - currentTraffic). The home you are living in has a higher Traffic Score, meaning there is less congestion on the roads. With less congestion, it is safer for children to get out and play in the home you are living in. \n\n")
                    }
                    
                    if (currentQuiet < newQuiet){
                        scoreText = scoreText + ("Difference: \(newQuiet - currentQuiet). The home you are interested in has a higher Quiet Score, so the home is further from factors like major high-traffic roads.\n\n")
                    } else if (currentQuiet > newQuiet) {
                        scoreText = scoreText + ("Difference: \(newQuiet - currentQuiet). The home you are living in has a higher Quiet Score, so your home is further from factors like major high-traffic roads.\n\n")
                    }
                    
                    if (currentSafety < newSafetyScore) {
                        scoreText = scoreText + ("Difference: \(newSafety - currentSafety). The home you are interested in has a higher Safety Score. Cars in the area drive safer than near your home. \n\n")
                    } else if (currentSafety > newSafetyScore) {
                        scoreText = scoreText + ("Difference: \(newSafety - currentSafety). The home you are living in has a higher Safety Score. Cars in the area drive safer than near your interested home. \n\n")
                    }
                    scoreText = scoreText + ("All in all, the house you are interested in is moderately safer for children than your current home. \n\n")
                    self.decisionLabel.text = "TL,DR: Interested house is safer."
                }
                
                //big difference
                else if(30 <= difference && difference <= 100){
                    if (currentTraffic < newTraffic){
                        scoreText = scoreText + ("Difference: \(newTraffic - currentTraffic). Your interested home has a higher Traffic Score, meaning there is less congestion on the roads. With less congestion, it is safer for children to get out and play in the home you are interested in. \n\n")
                    } else if(currentTraffic > newTraffic) {
                        scoreText = scoreText + ("Difference: \(newTraffic - currentTraffic). The home you are living in has a higher Traffic Score, meaning there is less congestion on the roads. With less congestion, it is safer for children to get out and play in the home you are living in. \n\n")
                    }
                    
                    if (currentQuiet < newQuiet){
                        scoreText = scoreText + ("Difference: \(newQuiet - currentQuiet). The home you are interested in has a higher Quiet Score, so the home is further from factors like major high-traffic roads. \n\n")
                    } else if (currentQuiet > newQuiet) {
                        scoreText = scoreText + ("Difference: \(newQuiet - currentQuiet). The home you are living in has a higher Quiet Score, so your home is further from factors like major high-traffic roads. \n\n")
                    }
                    
                    if (currentSafety < newSafetyScore) {
                        scoreText = scoreText + ("Difference: \(newSafety - currentSafety). The home you are interested in has a higher Safety Score. Cars in the area drive safer than near your home.\n\n")
                    } else if (currentSafety > newSafetyScore) {
                        scoreText = scoreText + ("Difference: \(newSafety - currentSafety). The home you are living in has a higher Safety Score. Cars in the area drive safer than near your interested home. \n\n")
                    }
                    scoreText = scoreText + ("All in all, the house you are interested in is very much safer for children than your current home. \n\n")
                    
                    self.decisionLabel.text = "TL,DR: Interested house is safer."
                } else {
                    //current home is good
                    scoreText = scoreText + ("Differences in safety for interested house to current house varies by \(difference)! Your current home has a better Home Score and is safer for children.")
                    
                    self.decisionLabel.text = "TL,DR: Your current house is safer."
                }
                
            } else {
                scoreText = scoreText + ("Wrong address input. Try again. \n")
            }
            SVProgressHUD.dismiss()
            self.currentAddressLabel.text = scoreText
        }
        
    }
    
}
