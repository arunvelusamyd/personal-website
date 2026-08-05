# DNS — Domain Name System

*By Arunkumar Velusamy · Aug 2024*

---

From Wikipedia, the Domain Name System is described as "the hierarchical and decentralized naming system used to identify computers, services, and other resources reachable through the Internet."

In essence, DNS converts human-friendly domain names like www.google.com into machine-readable IP addresses such as 172.217.194.105. Domain registrars like GoDaddy, Namecheap, AWS Route53, and Bluehost facilitate domain registration.

## Top Level Domain

The TLD occupies the highest position in the hierarchy. Examples include .com, .gov, .sg, .in, .org, and .info.

## Second Level Domain

An SLD sits directly beneath a TLD. Examples are tailenders.info, example.com, google.com, and amazon.com.

## FQDN (Fully Qualified Domain name)

The FQDN represents the complete domain name. An illustration would be shop.www.tailenders.com.

## Subdomain

Within DNS's hierarchical structure, domains can contain multiple subdomains. For tailenders.info, ".info" serves as the TLD while "tailenders" functions as a subdomain of .info. Further subdomains like shop.tailenders.info and api.tailenders.info can exist. Similarly, www.tailenders.info makes "www" a subdomain of tailenders.info.

## Difference between a hostname and a subdomain

A hostname identifies a specific computer or resource, whereas a subdomain extends the parent domain by subdividing it.

## Root domain

At DNS's apex sits the root domain, which lacks a name like TLDs do—it's simply an empty string. All FQDNs technically conclude with a period (www.google.com.), though users don't explicitly type this.

- Root DNS servers are managed by ICANN
- TLD DNS servers are managed by IANA (an ICANN branch)
- SLD domain servers are managed by domain registrars

## How DNS works?

When accessing a domain, your machine queries a local DNS resolver—typically your ISP's server or your organization's DNS server. If the resolver has cached the domain's IP address, it returns it immediately.

Otherwise, it requests the IP address of the TLD server from the root DNS server. The resolver then contacts the TLD server for the SLD server's IP address. Next, it queries the SLD domain server for the actual domain's IP address. Once obtained, the local DNS server caches this information and provides it to your machine, enabling connection to the target server.
