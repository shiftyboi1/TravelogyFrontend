import { ThemedView } from "@/components/themed-view";
import { ScrollView, StyleSheet } from "react-native";
import { ArticleDelimiter } from "../types/types";
import { ArticleHeader } from "./article-header";
import { MarkdownRenderer } from "./markdown-renderer";
import { Ticket } from "./ticket";

const testDelimiter : ArticleDelimiter= {
  location: "Malmö ; Sweden",
  tag: "bus",
  type: "city"
};

const testContent = {
  operatingHours: "12:00 - 21:30",
  relativePrice: "MID" as 'LOW' | 'MID' | 'HIGH',
};

const markdown: string = `
## TIMETABLES

* Digital displays and route maps at major stops and terminals.
* Official transit mobile app with route maps, stop lists, and real-time departures.
* Journey planner integrated into the regional public transport system.

## PURCHASE

Bus travel is included in the city-wide public transport ticket for Malmö (local zone). City-wide tickets can be purchased digitally or at authorized sales points before boarding.

* App/Online: Official Skånetrafiken mobile app.
* Machines: Ticket machines at major stations and selected stops.

## DISCOUNTS

* Student: Valid student status verified with an approved student card (for example, ISIC or Swedish student card).
* Senior: Age-based eligibility verified with photo ID.
* Child/Youth: Age-based eligibility verified by age declaration or ID when requested.

## HINTS

* Tickets must be purchased and activated before boarding; onboard sales are not available.
* Cash is not accepted on buses.
* Tickets are validated digitally in the app or automatically upon purchase from machines.
* Night services may operate on selected routes outside standard hours, especially on weekends.
* Zone validity matters when traveling beyond Malmö city limits.

`;

export function ArticlePage() {
  return (
    <ThemedView style={styles.container}>
      <ArticleHeader locationText={testDelimiter.location} style={styles.header} />
      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.content}>
          <Ticket delimiter={testDelimiter} content={testContent} style={styles.ticket} />
          <MarkdownRenderer style={styles.markdown} markdown={markdown} />
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 250,
    zIndex: 0,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  content: {
    alignItems: 'stretch',
    marginTop: 200,
    minHeight: 100,
    borderRadius: 16,
  },
  ticket: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  markdown: {
    marginBottom: 240,
    paddingHorizontal: 24,
  },
});