//
//  TopicsTableViewController.swift
//  UnitedHatzlahMedic
//
//  Created by Ziv Levy on 5/6/15.
//  Copyright (c) 2015 Ziv Levy. All rights reserved.
//

import UIKit

class TopicsTableViewController: UITableViewController, UISearchBarDelegate, UISearchResultsUpdating {

    var searchController : UISearchController!;
    
    var topics = [String: [Topic]]();
    var filteredTopics = [Topic]();
    var sectionsIdAndTitleMap = [String: String]();
    var sections = [String]();

    override func viewDidLoad() {
        super.viewDidLoad();
        self.searchController = UISearchController(searchResultsController: nil);
        self.searchController.searchResultsUpdater = self;
        self.searchController.dimsBackgroundDuringPresentation = false;
        self.searchController.searchBar.delegate = self;
        self.tableView.tableHeaderView = self.searchController.searchBar;
        self.definesPresentationContext = true;
        self.searchController.searchBar.sizeToFit();
        self.tableView.sizeToFit();
        
        self.loadData();

        // Uncomment the following line to preserve selection between presentations
//        self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem()
    }

    func loadData() {
        let path = NSBundle.mainBundle().pathForResource("topics", ofType: "json");
        let jsonData = NSData(contentsOfFile: path!);
        let jsonResult: NSDictionary = (try! NSJSONSerialization.JSONObjectWithData(jsonData!, options: NSJSONReadingOptions.MutableContainers)) as! NSDictionary;
        let allSections: NSDictionary = jsonResult["sections"] as! NSDictionary;
        for (sectionKey, section) in allSections {
            let sectionTitle: String = section["title"] as! String;
            let sectionKeyString: String = sectionKey as! String;
            sectionsIdAndTitleMap[sectionKeyString] = sectionTitle;
            sections.append(sectionKeyString);
            var topicsInSection = [Topic]();
            let tempTopics: NSArray = section["topics"] as! NSArray;
            for topic in tempTopics {
                let t = Topic(data: topic as! NSDictionary);
                topicsInSection.append(t);
            }

            topics.updateValue(topicsInSection, forKey: sectionKey as! String);
        }

    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    func filterContentForSearchText(searchText: String) {

        // Filter the array using the filter method
        self.filteredTopics.removeAll(keepCapacity: false);
        for(topicKey, topicsInKey) in topics {
            let filtered : [Topic] = topicsInKey.filter({
                (topic: Topic) -> Bool in
                let stringMatch = topic.title.rangeOfString(searchText)
                return stringMatch != nil;
            });
            self.filteredTopics.appendContentsOf(filtered);
        }
    }
    
    func updateSearchResultsForSearchController(searchController: UISearchController) {
        self.filterContentForSearchText(searchController.searchBar.text);
        
    }

    /*func searchDisplayController(controller: UISearchController, shouldReloadTableForSearchString searchString: String!) -> Bool {
        self.filterContentForSearchText(searchString);
        return true;
    }

    func searchDisplayController(controller: UISearchController, shouldReloadTableForSearchScope searchOption: Int) -> Bool {

        return true;
    }*/
    
    func topicAtIndexPath(indexPath: NSIndexPath) -> Topic  {
        var topicsInSection : [Topic] = topics[sections[indexPath.section]]!;
        return topicsInSection[indexPath.row];
    }

    // MARK: - Table view data source

    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        // #warning Potentially incomplete method implementation.
        // Return the number of sections.
        if self.searchController!.active {
            return 1;
        } else {
            return sections.count;
        }
    }

    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete method implementation.
        // Return the number of rows in the section.
        if self.searchController!.active {
            return self.filteredTopics.count;
        } else {
            let topicsInSection : [Topic] = topics[sections[section]]!;
            return topicsInSection.count;
        }
    }

    override func tableView(tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        if self.searchController!.active {
            return "";
        } else {
            return sectionsIdAndTitleMap[sections[section]];
        }
    }


    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        var tCell = tableView.dequeueReusableCellWithIdentifier("topicCell") as? UITableViewCell

        if (tCell == nil) {
            tCell = UITableViewCell(style: UITableViewCellStyle.Default, reuseIdentifier: "topicCell");
        }
        
        let cell = tCell!;

        // Configure the cell...
        var topic = Topic();
        
        // Check to see whether the normal table or search results table is being displayed and set the Candy object from the appropriate array
        if tableView == self.searchController!.active {
            topic = filteredTopics[indexPath.row];
        } else {
            topic = topicAtIndexPath(indexPath);
        }

        // Configure the cell
        var title: String? = String(stringInterpolationSegment: topic.title);
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
