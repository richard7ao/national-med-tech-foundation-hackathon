"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { listings } from "../data/listings";
import { pharmacies, currentPharmacy } from "../data/pharmacies";
import { getMedicineById, formatMedicineName } from "../data/medicines";
import Badge from "../components/Badge";
import RequestModal from "../components/RequestModal";
import type { MapMarker } from "../components/PharmacyMap";

const PharmacyMap = dynamic(() => import("../components/PharmacyMap"), { ssr: false });

function distanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function kmToMiles(km: number): number {
  return km * 0.621371;
}

export default function SearchPage() {
  const [selectedListing, setSelectedListing] = useState<string | null>(null);
  const [highlightPharmacy, setHighlightPharmacy] = useState<string | null>(null);

  const availableListings = useMemo(() => {
    return listings
      .filter((l) => l.status === "available" && l.pharmacyId !== currentPharmacy.id)
      .map((l) => {
        const pharmacy = pharmacies.find((p) => p.id === l.pharmacyId)!;
        const med = getMedicineById(l.medicineId)!;
        const dist = distanceKm(currentPharmacy.lat, currentPharmacy.lng, pharmacy.lat, pharmacy.lng);
        return { listing: l, pharmacy, medicine: med, distanceMiles: kmToMiles(dist) };
      })
      .sort((a, b) => a.distanceMiles - b.distanceMiles);
  }, []);

  const markers: MapMarker[] = useMemo(() => {
    const pharmacyListingCounts = new Map<string, number>();
    availableListings.forEach(({ listing }) => {
      pharmacyListingCounts.set(listing.pharmacyId, (pharmacyListingCounts.get(listing.pharmacyId) ?? 0) + 1);
    });

    const markerList: MapMarker[] = [
      { id: currentPharmacy.id, lat: currentPharmacy.lat, lng: currentPharmacy.lng, label: currentPharmacy.name, isCurrentUser: true },
    ];

    pharmacyListingCounts.forEach((count, pharmacyId) => {
      const ph = pharmacies.find((p) => p.id === pharmacyId)!;
      markerList.push({ id: ph.id, lat: ph.lat, lng: ph.lng, label: ph.name, count });
    });

    return markerList;
  }, [availableListings]);

  const modalListing = selectedListing
    ? availableListings.find((a) => a.listing.id === selectedListing)
    : null;

  return (
    <div>
      {/* Search Bar */}
      <div className="glass-card-static px-6 py-5 mb-5 flex gap-3 items-center">
        <input
          type="text"
          placeholder='Search medicines... e.g. "Metformin 500mg"'
          className="flex-1 bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-emerald-400"
        />
        <select className="bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-600 outline-none focus:border-emerald-400">
          <option>Within: 5 miles</option>
          <option>Within: 2 miles</option>
          <option>Within: 10 miles</option>
        </select>
        <select className="bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-600 outline-none focus:border-emerald-400">
          <option>Sort: Distance</option>
          <option>Sort: Price</option>
          <option>Sort: Expiry</option>
        </select>
      </div>

      {/* Split: Map + Results */}
      <div className="grid grid-cols-2 gap-6" style={{ height: "calc(100vh - 200px)" }}>
        {/* Map */}
        <div className="glass-card-static overflow-hidden rounded-2xl relative z-0">
          <PharmacyMap
            markers={markers}
            onMarkerClick={(id) => setHighlightPharmacy(id)}
          />
        </div>

        {/* Results */}
        <div className="overflow-y-auto pr-1">
          <div className="text-[13px] text-slate-400 mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
            Showing <strong className="text-slate-600">{availableListings.length} listings</strong> from nearby pharmacies
          </div>

          <div className="flex flex-col gap-6">
            {availableListings.map(({ listing, pharmacy, medicine, distanceMiles }) => {
              const savingsPercent = Math.round(((medicine.wholesalePrice - listing.pricePerPack) / medicine.wholesalePrice) * 100);
              const isHighlighted = highlightPharmacy === pharmacy.id;

              return (
                <div
                  key={listing.id}
                  className={`glass-card-static p-6 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-200 ${
                    isHighlighted
                      ? "ring-2 ring-emerald-400 shadow-[0_8px_32px_rgba(52,211,153,0.12)]"
                      : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div
                        className="text-[15px] font-bold text-slate-800"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        {pharmacy.name}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {pharmacy.postcode} · {distanceMiles.toFixed(1)} miles
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-amber-400 text-xs">{"★".repeat(Math.round(pharmacy.rating))}</span>
                      <span className="text-[11px] text-slate-400">{pharmacy.rating}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-semibold text-slate-700">
                        {formatMedicineName(medicine)} · {listing.quantity} packs
                      </div>
                      <div className="flex gap-1.5 mt-1.5">
                        <Badge variant="verified" />
                        <span className="text-[11px] text-slate-400">
                          Exp: {new Date(listing.expiryDate).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-600">£{listing.pricePerPack.toFixed(2)}</div>
                      <div className="text-[10px] text-emerald-500">{savingsPercent}% below wholesale</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedListing(listing.id)}
                    className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 shadow-[0_4px_16px_rgba(52,211,153,0.3)]"
                  >
                    Request
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Request Modal */}
      {modalListing && (
        <RequestModal
          medicineName={formatMedicineName(modalListing.medicine)}
          quantity={modalListing.listing.quantity}
          pricePerPack={modalListing.listing.pricePerPack}
          wholesalePrice={modalListing.medicine.wholesalePrice}
          pharmacyName={modalListing.pharmacy.name}
          onClose={() => setSelectedListing(null)}
        />
      )}
    </div>
  );
}
