//
//  SecondViewController.swift
//  UnitedHatzlahMedic
//
//  Created by Ziv Levy on 5/2/15.
//  Copyright (c) 2015 Ziv Levy. All rights reserved.
//

import UIKit

class TopicDetailsViewController: UIViewController {

    @IBOutlet weak var webview: UIWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad();

        self.navigationController?.title = "";
        var url = NSBundle.mainBundle().URLForResource("pir", withExtension: "html");
        let request = NSURLRequest(URL: url!)

        webview.loadRequest(request);
        
        
        
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

