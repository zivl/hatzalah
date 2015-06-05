//
//  Topic.swift
//  UnitedHatzlahMedic
//
//  Created by Ziv Levy on 6/1/15.
//  Copyright (c) 2015 Ziv Levy. All rights reserved.
//

import UIKit

class Topic: NSObject {

    var id : String = "";
    var title : String = "";
    
    override init() {
        
    }
    
    init(data: NSDictionary){
        self.id = data["id"] as! String;
        self.title = data["title"] as! String;
    }
   
}
