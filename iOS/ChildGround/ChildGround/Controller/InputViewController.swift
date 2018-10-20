//
//  InputViewController.swift
//  ChildGround
//
//  Created by Jungyoon Yu on 10/19/18.
//  Copyright © 2018 JungyoonYu. All rights reserved.
//

import UIKit
import SwiftyJSON
import Alamofire
import SVProgressHUD

class InputViewController: UIViewController {
    
    @IBOutlet weak var currentAddress: UITextField!
    @IBOutlet weak var interestAddress: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    
    @IBAction func loadButtonPressed(_ sender: Any) {
        if (currentAddress.text != "" && interestAddress.text != ""){
            performSegue(withIdentifier: "loadAddress", sender: self)
        } else {
            SVProgressHUD.showInfo(withStatus: "Incomplete Field(s)")
            SVProgressHUD.dismiss(withDelay: 1.5)
        }
    }
    
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "loadAddress" {
            let destinationVC = segue.destination as! LoadViewController
            destinationVC.currentAddress = self.currentAddress.text!
            destinationVC.interestAddress = self.interestAddress.text!
        }
    }

}
