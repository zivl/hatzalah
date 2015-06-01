//
//  TopicsTableViewController.swift
//  UnitedHatzlahMedic
//
//  Created by Ziv Levy on 5/6/15.
//  Copyright (c) 2015 Ziv Levy. All rights reserved.
//

import UIKit

class TopicsTableViewController: UITableViewController, UISearchBarDelegate, UISearchControllerDelegate{

    var topics = [Topic]();
    var filteredTopics = [Topic]();
    
    override func viewDidLoad() {
        super.viewDidLoad();
        
        let path = NSBundle.mainBundle().pathForResource("topics", ofType: "json");
        let jsonData = NSData(contentsOfFile: path!);
        var jsonResult: NSDictionary = NSJSONSerialization.JSONObjectWithData(jsonData!, options: NSJSONReadingOptions.MutableContainers, error: nil) as! NSDictionary;
        var temp : NSArray = jsonResult["topics"] as! NSArray;
        for (var i = 0; i < temp.count; i++){
            var t = Topic(data: temp[i] as! NSDictionary);
            topics.append(t);
        }

        // Uncomment the following line to preserve selection between presentations
//        self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func filterContentForSearchText(searchText: String) {
        // Filter the array using the filter method
        self.filteredTopics = self.topics.filter({( topic: Topic) -> Bool in
            let stringMatch = topic.title.rangeOfString(searchText)
            return stringMatch != nil;
        });
    }
    
    func searchDisplayController(controller: UISearchController, shouldReloadTableForSearchString searchString: String!) -> Bool {
        self.filterContentForSearchText(searchString);
        return true;
    }
    
    func searchDisplayController(controller: UISearchController, shouldReloadTableForSearchScope searchOption: Int) -> Bool {
        self.filterContentForSearchText(controller.searchBar.text);
        return true;
    }

    // MARK: - Table view data source

    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        // #warning Potentially incomplete method implementation.
        // Return the number of sections.
        return 1
    }

    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete method implementation.
        // Return the number of rows in the section.
        if tableView == self.searchDisplayController!.searchResultsTableView {
            return self.filteredTopics.count;
        } else {
            return self.topics.count;
        }
    }

    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        var tCell = tableView.dequeueReusableCellWithIdentifier("topicCell") as? UITableViewCell

        if (tCell == nil) {
            tCell = UITableViewCell (style: UITableViewCellStyle.Default, reuseIdentifier: "topicCell");
        }
        let cell = tCell!;
        var index = indexPath.row;
        
        // Configure the cell...
        var topic : Topic
        // Check to see whether the normal table or search results table is being displayed and set the Candy object from the appropriate array
        if tableView == self.searchDisplayController!.searchResultsTableView {
            topic = filteredTopics[index];
        } else {
            topic = topics[index];
        }
        
        // Configure the cell
        var title:String? = String(stringInterpolationSegment: topic.title);
        if let t = title {
            cell.textLabel?.text = t;
        }

        return cell
    }

    /*
    // Override to support conditional editing of the table view.
    override func tableView(tableView: UITableView, canEditRowAtIndexPath indexPath: NSIndexPath) -> Bool {
        // Return NO if you do not want the specified item to be editable.
        return true
    }
    */

    /*
    // Override to support editing the table view.
    override func tableView(tableView: UITableView, commitEditingStyle editingStyle: UITableViewCellEditingStyle, forRowAtIndexPath indexPath: NSIndexPath) {
        if editingStyle == .Delete {
            // Delete the row from the data source
            tableView.deleteRowsAtIndexPaths([indexPath], withRowAnimation: .Fade)
        } else if editingStyle == .Insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }
    */

    /*
    // Override to support rearranging the table view.
    override func tableView(tableView: UITableView, moveRowAtIndexPath fromIndexPath: NSIndexPath, toIndexPath: NSIndexPath) {

    }
    */

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(tableView: UITableView, canMoveRowAtIndexPath indexPath: NSIndexPath) -> Bool {
        // Return NO if you do not want the item to be re-orderable.
        return true
    }
    */

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using [segue destinationViewController].
        // Pass the selected object to the new view controller.
    }
    */

}
