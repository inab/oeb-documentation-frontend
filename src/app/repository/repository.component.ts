import { Component, OnInit } from "@angular/core";

import { Repository } from "../model/Repository";

import { RepositoryService } from "../services/repository.service";

@Component({
  selector: "app-repository",
  templateUrl: "./repository.component.html",
  styleUrls: ["./repository.component.css"],
})
export class RepositoryComponent implements OnInit {
  //attributes
  topics: string[] = [];
  repos: Repository[] = [];
  
  //filter properties
  expanded: boolean = false;
  topicFilter: string[];
  selectedTopics: string[] = [];
  filteredRepos: Repository[] = [];

  //pagination properties
  currentPage: number;
  itemsPerPage: number;

  constructor(private repoService: RepositoryService) { }

  ngOnInit(): void {
    this.repoService.getTopics().subscribe((data) => {
      this.topics = data;
    });
    this.repoService.getRepos().subscribe((data) => {
      this.repos = data;
      this.filteredRepos = this.repos;
    });

    this.itemsPerPage = 10;
    this.currentPage = 1;
  }

  showCheckboxes() {
    let checkboxes = document.getElementById("checkboxes");
    if (!this.expanded) {
      checkboxes.style.display = "block";
      this.expanded = true;
    } else {
      checkboxes.style.display = "none";
      this.expanded = false;
    }
  }

  getSelectedTopics(): string[] {
    this.selectedTopics = this.topicFilter;
    return this.selectedTopics;
  }

  filter(topicsArray: string[]) {
    topicsArray = this.getSelectedTopics();
    this.repoService.getFilteredRepos(topicsArray).subscribe((data) => {
      this.filteredRepos = data;
    });
  }

  /*filter2(): Repository[] {
    for (let topic of this.topics) {
      for (let repo of this.repos) {
        for (let topicRepo of repo.topics) {
          if (topic.toLowerCase() == topicRepo.toLowerCase()) {
            this.filteredRepos = this.repos;
          }
        }
      }
    }
    return this.filteredRepos;
  }

  filter3() {
    this.filteredRepos = this.repos.filter((repo) => {
      let topicValid: boolean = false;
      for (let topic of repo.topics) {
        if (this.topicFilter) {
          if (
            topic.toLowerCase().indexOf(this.topicFilter.toLowerCase()) != -1
          ) {
            topicValid = true;
          }
        } else {
          topicValid = true;
        }
      }

      return topicValid;
    });
  }*/
}
